import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { BannerService } from 'src/app/services/banner.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  banners: any[] = [];
  filteredProducts: Product[] = [];
  filteredProductsForPage: Product[] = [];
  category: string;
  page: number;
  subscription: Subscription;
  totalPages: number;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private bannerService: BannerService,
    private shoppingCartService: ShoppingCartService
  ) {

    this.bannerService.getAll().subscribe(data => {
      this.banners = JSON.parse(data["_body"])["data"];
    });

    this.productService.getAll().subscribe(data => {
      this.filteredProducts = this.products = JSON.parse(data["_body"])["data"];
      this.route.queryParamMap.subscribe(params => {
        this.category = params.get('category');
        if (this.category == 'sale') {
          this.filteredProducts = this.products.filter(p => { return p.isSale == true })
        } else {
          this.filteredProducts = (this.category) ?
            this.products.filter(p => { return p.category === this.category }) :
            this.products;
        }
        // this.page = Math.ceil(this.filteredProducts.length / 8);
        

        this.page = parseInt(params.get('page'));
        this.filteredProductsForPage = (this.page) ?
          this.filteredProducts.slice(8 * (this.page - 1), 8 * (this.page)) :
          this.filteredProducts.slice(0, 8);
        this.totalPages = Math.ceil(this.filteredProducts.length / 8);
        if (!this.page)
          this.page = 1;
      });
    });
    this.bannerService.getAll().subscribe(data => {
      this.banners = JSON.parse(data["_body"])["data"];
    });
  }
  counter(i: number) {
    return new Array(Math.ceil(i / 8));
  }

  ngOnInit() {
    this.bannerService.getAll().subscribe(data => {
      this.banners = JSON.parse(data["_body"])["data"];
    });
    // if( document.getElementById("script2")){
    //   document.getElementById("script2").remove();
    //   // document.getElementsByClassName("mean-bar")[0].remove();
    //   // document.getElementsByClassName("mean-bar")[1].remove();
    // }

    // var script2 = document.createElement("script");
    // script2.setAttribute("id", "script2");
    // script2.setAttribute("src", "./assets/js/main.js");
    // document.body.appendChild(script2);
    // alert(document.getElementsByClassName("mean-bar").length);
  }

  ngOnDestroy() {

  }

}
