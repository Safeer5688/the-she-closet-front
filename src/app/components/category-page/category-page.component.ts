import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { BannerService } from 'src/app/services/banner.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.css']
})
export class CategoryPageComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  filteredProductsForPage: Product[] = [];
  category: string;
  page: number;
  subscription: Subscription;
  totalPages : number;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService
  ) {

    
    this.productService.getAll().subscribe(data => {
      this.filteredProducts = this.products = JSON.parse(data["_body"])["data"];
      this.route.queryParamMap.subscribe(params => {
        this.category =  params.get('category');
        console.log(this.category);
        this.filteredProducts = (this.category) ?
          this.products.filter(p => { return p.category === this.category }) :
          this.products;
        this.page = parseInt(params.get('page'));
        this.filteredProductsForPage = (this.page) ?
          this.filteredProducts.slice(8 * (this.page - 1), 8 * (this.page)) :
          this.filteredProducts.slice(0 , 8 );
          this.totalPages = Math.ceil(this.filteredProducts.length/8);
        if(!this.page)
          this.page=1;
        console.log(this.products);
        console.log(this.filteredProductsForPage);
      });
    });
  }
  counter(i: number) {
    return new Array(Math.ceil(i/8));
  }

  ngOnInit() {

  }

  ngOnDestroy() {

  }

}
