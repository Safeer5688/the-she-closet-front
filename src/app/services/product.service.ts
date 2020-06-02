import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
// import 'rxjs/add/operator/map';
import { map } from "rxjs/operators";
import {tokenNotExpired} from 'angular2-jwt';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http:Http,
    private authService:AuthService
    ) { }

  create(product){
    let headers = new Headers();
    this.authService.loadToken();
    headers.append('Authorization',this.authService.authToken);
    console.log(this.authService.authToken);
    headers.append( 'Content-Type', 'application/json' );
    return this.http.post('admin/products/new',product,{headers:headers}).pipe(map(res => res));
  }

  getAll(){
    let headers = new Headers();
    headers.append( 'Content-Type', 'application/json' );
    return this.http.get('product',{headers:headers}).pipe(map(res => res));
  }

  get(productId){
    let headers = new Headers();
    headers.append( 'Content-Type', 'application/json' );
    return this.http.get('product/'+productId,{headers:headers}).pipe(map(res => res));
  }

  update(productId, product){
    let headers = new Headers();
    this.authService.loadToken();
    headers.append('Authorization',this.authService.authToken);
    console.log(this.authService.authToken);
    headers.append( 'Content-Type', 'application/json' );
    return this.http.post('admin/products/update/'+productId,product,{headers:headers}).pipe(map(res => res));  
  }

  delete(productId){
    let headers = new Headers();
    this.authService.loadToken();
    headers.append('Authorization',this.authService.authToken);
    console.log(this.authService.authToken);
    headers.append( 'Content-Type', 'application/json' );
    return this.http.get('admin/products/delete/'+productId,{headers:headers}).pipe(map(res => res));
  }
  
}
