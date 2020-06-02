import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import {FlashMessagesService} from 'angular2-flash-messages';


@Component({
  selector: 'app-products-single',
  templateUrl: './products-single.component.html',
  styleUrls: ['./products-single.component.css']
})
export class ProductsSingleComponent implements OnInit {
  product :any;
  id;
  size;
  constructor(
    private router: Router,
    private productService: ProductService,
    private route: ActivatedRoute,
    private shoppingCartService:ShoppingCartService,
    private flashMessage:FlashMessagesService
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.product = this.productService.get(this.id).subscribe(data => {
        console.log(JSON.parse(data["_body"]));
        this.product = JSON.parse(data["_body"])["data"];
        console.log(this.product);
      });
    }
  }

  addToCart() {
    // var addButton = document.getElementById('addButton');
    // addButton.innerHTML = "Adding To Cart..";
    // addButton.style.cursor= 'not-allowed;';
    // addButton.style.pointerEvents = "none";
    let quantity: number = parseInt((<HTMLInputElement>document.getElementById("quantity")).value);
    if(!this.size){
      return alert("Select Size Please");
    }
    if(quantity<1){
      return alert("Select Valid Quantity Please");
    }
    var cartItem = {
      _id:this.id,
      title:this.product.title,
      price:this.product.price,
      size:this.size,
      quantity:quantity,
      imageLink:this.product.imageUrls[0].link,
    }
    this.shoppingCartService.addToCart3(cartItem);
    var scrollup = document.getElementById("scrollUp");
    scrollup.click();
    this.flashMessage.show("Item successfully added. You can continue the shopping.", {cssClass: 'alert-success', timeout: 10000});
    // this.router.navigate(['']);
  }
  selectSize(size: string) {
    this.size = size;
  }
  ngOnInit() {
  }

}
