import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
// import 'rxjs/add/operator/map';
import { map } from "rxjs/operators";
import {tokenNotExpired} from 'angular2-jwt';
import { AuthService } from './auth.service';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(
    private http:Http,
    private authService:AuthService,
  ) { }

  makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  

  createCart2(){
    var cart = {
      id:this.makeid(30),
      dateCreated: new Date().getTime(),
      items:[]
    };
    localStorage.setItem('cart',JSON.stringify(cart));
    return cart;
  }
  get itemCount(){
    let count = 0;
    let cart = JSON.parse(localStorage.getItem('cart'));
    if(!cart) return count;
    cart.items.forEach(element => {
      count += element.quantity;
    });
    return count;
  }
  addToCart2(product:Product){
    let cart = JSON.parse(localStorage.getItem('cart'));
    if(!cart) cart = this.createCart2();
    let index = cart.items.findIndex((item => item._id == product._id));
    if(index==-1){
      cart.items.push(
        {
          _id:product._id,
          title:product.title,
          category:product.category,
          price:product.price,
          urduname:product.urduname,
          imageUrls:product.imageUrls,
          quantity:1
        }
        );
      localStorage.setItem('cart',JSON.stringify(cart));
    }else{
      cart.items[index].quantity++;
      localStorage.setItem('cart',JSON.stringify(cart));
    }
    localStorage.setItem('cart',JSON.stringify(cart));
  }
  addToCart3(product:any){
    let cart = JSON.parse(localStorage.getItem('cart'));
    if(!cart) cart = this.createCart2();
    let index = cart.items.findIndex((item => (item._id == product._id && item.size == product.size)));
    console.log(product);
    if(index==-1){
      cart.items.push(
        {
          _id:product._id,
          title:product.title,
          price:product.price,
          imageLink:product.imageLink,
          quantity:product.quantity,
          size:product.size
        }
        );
      localStorage.setItem('cart',JSON.stringify(cart));
    }else{
      cart.items[index].quantity += product.quantity;
      localStorage.setItem('cart',JSON.stringify(cart));
    }
    localStorage.setItem('cart',JSON.stringify(cart));
  }
  removeFromCart2(product:any){
    let cart = JSON.parse(localStorage.getItem('cart'));
    if(!cart) cart = this.createCart2();
    let index = cart.items.findIndex((item => (item._id == product._id && item.size == product.size)));
    if(index==-1){
      console.log("Run Lelo")
    }else{
      if(cart.items[index].quantity>1){
        cart.items[index].quantity--;
      }
      else{
        cart.items.splice(index,1);
      }
      localStorage.setItem('cart',JSON.stringify(cart));
    }
  }

  productCount(product:any){
    let cart = JSON.parse(localStorage.getItem('cart'));
    // return cart;
    if(!cart) return 0;
    let item = cart.items.find(o => (o._id == product._id && o.size == product.size));
    return item ? item.quantity : 0;
    // if(!cart) return 0;
    // let item = cart.items.find(o => o.id == product._id);
    // return item ? item.quantity : 0;
  }

  // productCount(product:Product){
  //   let cart = JSON.parse(localStorage.getItem('cart'));
  //   // return cart;
  //   if(!cart) return 0;
  //   let item = cart.items.find(o => o._id == product._id);
  //   return item ? item.quantity : 0;
  //   // if(!cart) return 0;
  //   // let item = cart.items.find(o => o.id == product._id);
  //   // return item ? item.quantity : 0;
  // }

  getCart(){
    let cart = JSON.parse(localStorage.getItem('cart'));
    if(!cart) return [];
    return cart.items;
  }
  get getSubTotalPrice(){
    let cart = JSON.parse(localStorage.getItem('cart'));
    let promo = JSON.parse(localStorage.getItem('promo'));
    let price = 0;
    if(!cart) return price;
    cart.items.forEach( item => {
      price += item.quantity*item.price;
    });
    return price;
    
  }
  get getTotalPrice(){
    let cart = JSON.parse(localStorage.getItem('cart'));
    let promo = JSON.parse(localStorage.getItem('promo'));
    let price = 0;
    if(!cart) return price;
    cart.items.forEach( item => {
      price += item.quantity*item.price;
    });
    if(promo && promo.amount>0 && promo.isActive){
      if(promo.isPercent){
        price = price*((100-promo.amount)/100);
        return price;
      }
      else{
        price = price - promo.amount;
        if(price<0)
          price=0;
        return price;
      }
      
    }
    else{
      return price;
    }
  }

  applyPromo(promo){
    let headers = new Headers();
    headers.append( 'Content-Type', 'application/json' );
    return this.http.get('promo/'+promo,{headers:headers}).pipe(map(res => res));
  }

  getPromo(){
    let promo = JSON.parse(localStorage.getItem('promo'));
    return promo;
  }

  addPromo(promo){
    localStorage.setItem('promo',JSON.stringify(promo[0]));
  }

  clearCart(){
    let cart = JSON.parse(localStorage.getItem('cart'));
    cart.items = []; 
    localStorage.setItem('cart',JSON.stringify(cart));
    this.removePromo();
  }

  removePromo(){
    localStorage.removeItem('promo');
  }

  placeOrder(order){
    let headers = new Headers();
    let token = localStorage.getItem('id_token');
    
    headers.append('Authorization',token);
    headers.append( 'Content-Type', 'application/json' );
    return this.http.post('users/order/new',order,{headers:headers}).pipe(map(res => res));
  }
}
