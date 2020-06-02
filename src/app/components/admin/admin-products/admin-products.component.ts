import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Subscription } from 'rxjs/Subscription';
import { Product } from 'src/app/models/product';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit,OnDestroy {
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  products : Product[];
  // filteredProducts: any[];
  subscription: Subscription;
  constructor( private productService: ProductService) { 
    // this.subscription = this.productService.getAll().subscribe(data => {
    //   this.filteredProducts = this.products = JSON.parse(data["_body"])["data"];
    // });
  }

  // filter(query:string){
  //   this.filteredProducts = (query) ?
  //     this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
  //     this.products;
  // }
  
  ngOnDestroy(){
    this.dtTrigger.unsubscribe();
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.productService.getAll().subscribe(data => {
      this.products = JSON.parse(data["_body"])["data"];
      this.dtTrigger.next();
    });
  }

}
