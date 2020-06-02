import { Component, OnInit, OnDestroy } from '@angular/core';
import { BannerService } from 'src/app/services/banner.service';
import { Subscription } from 'rxjs/Subscription';
import { Product } from 'src/app/models/product';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-admin-banner',
  templateUrl: './admin-banner.component.html',
  styleUrls: ['./admin-banner.component.css']
})
export class AdminBannerComponent implements OnInit,OnDestroy{

  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  banners : any[];
  // filteredProducts: any[];
  subscription: Subscription;
  constructor( private bannerService: BannerService) { 
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
    this.bannerService.getAll().subscribe(data => {
      this.banners = JSON.parse(data["_body"])["data"];
      this.dtTrigger.next();
    });
  }


}
