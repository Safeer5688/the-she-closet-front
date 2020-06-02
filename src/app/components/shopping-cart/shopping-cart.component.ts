import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import {FlashMessagesService} from 'angular2-flash-messages';
@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cart$;
  items:any[] = [];
  constructor(
    public shoppingCartService: ShoppingCartService,
    private flashMessage:FlashMessagesService,
    ) {
     }

  
  removeItem(item){
    this.shoppingCartService.removeFromCart2(item);
    this.items = this.shoppingCartService.getCart();
  }
  clearCart(){
    this.shoppingCartService.clearCart();
    this.flashMessage.show('You have cleared the cart.', {cssClass: 'alert-danger', timeout: 5000});
    this.items = this.shoppingCartService.getCart();
  }
  applyPromo(promo){
    var scrollup = document.getElementById("scrollUp");
    // this.shoppingCartService.applyPromo(promo);
    this.shoppingCartService.applyPromo(promo).subscribe(data => {
      data = JSON.parse(data["_body"]);
      
      if(data["status"]){
        if(data["data"].length>0){
          if(data['data'][0]['isActive']){
            scrollup.click();
            this.shoppingCartService.addPromo(data["data"]);
            this.flashMessage.show('Promo Applied', {cssClass: 'alert-success', timeout: 5000});
          }
          else{
            scrollup.click();
            this.flashMessage.show("Wrong Promo", {cssClass: 'alert-danger', timeout: 5000});
          }
          
        }
        else{
          scrollup.click();
          this.flashMessage.show("Wrong Promo", {cssClass: 'alert-danger', timeout: 5000});
        }
        // this.navbar.setUser();
        // this.router.navigate(['']);
      }
      else{
        this.flashMessage.show(data["msg"], {cssClass: 'alert-danger', timeout: 5000});
        // this.router.navigate(['login']);
      }
    });
  }

  ngOnInit() {
    this.cart$ = this.shoppingCartService.itemCount;
    this.items = this.shoppingCartService.getCart();
    console.log(this.items);
  }

}
