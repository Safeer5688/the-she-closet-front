import { Component, OnInit } from '@angular/core';
import {FlashMessagesService} from 'angular2-flash-messages';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  items:any[] = [];
  constructor(
    private flashMessage:FlashMessagesService,
    private shoppingCartService:ShoppingCartService,
    private authService:AuthService,
    private router:Router
  ) {
    
    this.items = this.shoppingCartService.getCart();
    console.log(this.items);

  }

  ngOnInit() {
  }

  placeOrder(shippingDetails){
    // let user = this.authService.getUserInfo;
    var scrollup = document.getElementById("scrollUp");
    var checkoutButton = document.getElementById("checkoutButton");
    checkoutButton['disabled'] = true;
    checkoutButton['innerHTML'] = "Submitting..";
    let order = {
      shipping:shippingDetails,
      datePlaced:new Date().getTime(),
      items: this.shoppingCartService.getCart(),
      promo: this.shoppingCartService.getPromo()
    }
    console.log(order);
    this.shoppingCartService.placeOrder(order).subscribe(response =>{
      let res = JSON.parse(response['_body']);
      if(!res.status){
        if(res.msg=="Account not verified"){
          this.flashMessage.show('You need to verify your email account in order to proceed.', {cssClass: 'alert-danger', timeout: 5000});
          this.router.navigate(['/sendverificationlink']);
        }
        else{
          scrollup.click();
          this.flashMessage.show(res.msg, {cssClass: 'alert-danger', timeout: 3000});
          checkoutButton['disabled'] = false;
          checkoutButton['innerHTML'] = "Checkout";
        }
      }
      else{
        this.flashMessage.show("Your Order has been placed, Our team will contact you for the confirmation soon.", {cssClass: 'alert-success', timeout: 10000});
        this.router.navigate(['/my/orders/'+res.data._id]);
        localStorage.removeItem('cart');
        localStorage.removeItem('promo');
      }
    });
  }
}
