import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
// import 'rxjs/add/operator/map';
import { map } from "rxjs/operators";
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private http:Http,
    private authService:AuthService
    ) { }

  getAll(){
    let headers = new Headers();
    this.authService.loadToken();
    headers.append('Authorization',this.authService.authToken);
    headers.append( 'Content-Type', 'application/json' );
    return this.http.get('users/myorders',{headers:headers}).pipe(map(res => res));
  }

  getAllAdmin(){
    let headers = new Headers();
    this.authService.loadToken();
    headers.append('Authorization',this.authService.authToken);
    headers.append( 'Content-Type', 'application/json' );
    return this.http.get('admin/orders',{headers:headers}).pipe(map(res => res));
  }

  getOrder(id:string){
    let headers = new Headers();
    this.authService.loadToken();
    headers.append('Authorization',this.authService.authToken);
    headers.append( 'Content-Type', 'application/json' );
    return this.http.get('users/myorders/'+id,{headers:headers}).pipe(map(res => res));
  }

  updateOrderStatus(status,id){
    let headers = new Headers();
    this.authService.loadToken();
    headers.append('Authorization',this.authService.authToken);
    headers.append( 'Content-Type', 'application/json' );
    return this.http.get('admin/orders/'+id+'/'+status,{headers:headers}).pipe(map(res => res));
  }

}
