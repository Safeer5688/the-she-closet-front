import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../services/auth.service'
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  shoppingCartItemCount: number;
  categories$;
  constructor(
    private flashMessage:FlashMessagesService,
    public authService:AuthService,
    private router: Router,
    public shoppingCartService: ShoppingCartService,
    private categoryService:CategoryService
  ) {
    this.categoryService.getCategories().subscribe(data => {
      this.categories$ =  JSON.parse(data["_body"])["data"];
    });
  }
  


  async ngOnInit() {
    
  }

  onLogoutClick(){
    this.authService.logout();
    this.flashMessage.show('You are logged out',{cssClass: 'alert-success',timeout:3000});
    // this.user = null;
    this.router.navigate(['/login']);
    return false;
  }
  onCartClick(){
    var close = document.getElementById('closeSmallCart');
    close.click();
    this.router.navigate(['/shopping-cart']);
  }
  onCheckoutClick(){
    var close = document.getElementById('closeSmallCart');
    close.click();
    this.router.navigate(['/check-out']);
  }
}


