import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
// import 'rxjs/add/operator/map';
import { map } from "rxjs/operators";
import {tokenNotExpired} from 'angular2-jwt';
import { AuthService } from './auth.service';
import { ConstantsService } from './constants.service';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

   baseUrl:String;

  constructor(
    private http:Http,
    private authService:AuthService,
    private constantService:ConstantsService
    ) {
      this.baseUrl=this.constantService.getBaseUrl();
      console.log(this.baseUrl);
     }

  create(product){
    let headers = new Headers();
    this.authService.loadToken();
    headers.append('Authorization',this.authService.authToken);
    console.log(this.authService.authToken);
    headers.append( 'Content-Type', 'application/json' );
    return this.http.post(this.baseUrl+'admin/products/new',product,{headers:headers}).pipe(map(res => res));
  }

  getAll(){
    let headers = new Headers();
    headers.append( 'Content-Type', 'application/json' );
    return this.http.get(this.baseUrl+'product',{headers:headers}).pipe(map(res => res));
  }

  get(productId){
    let headers = new Headers();
    headers.append( 'Content-Type', 'application/json' );
    return this.http.get(this.baseUrl+'product/'+productId,{headers:headers}).pipe(map(res => res));
  }

  update(productId, product){
    let headers = new Headers();
    this.authService.loadToken();
    headers.append('Authorization',this.authService.authToken);
    console.log(this.authService.authToken);
    headers.append( 'Content-Type', 'application/json' );
    return this.http.post(this.baseUrl+'admin/products/update/'+productId,product,{headers:headers}).pipe(map(res => res));  
  }

  delete(productId){
    let headers = new Headers();
    this.authService.loadToken();
    headers.append('Authorization',this.authService.authToken);
    console.log(this.authService.authToken);
    headers.append( 'Content-Type', 'application/json' );
    return this.http.get(this.baseUrl+'admin/products/delete/'+productId,{headers:headers}).pipe(map(res => res));
  }
  
}
