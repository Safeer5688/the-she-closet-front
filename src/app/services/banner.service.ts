import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
// import 'rxjs/add/operator/map';
import { map } from "rxjs/operators";
import {tokenNotExpired} from 'angular2-jwt';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  constructor(
    private http:Http,
    private authService:AuthService
  ) { }

  getAll(){
    let headers = new Headers();
    headers.append( 'Content-Type', 'application/json' );
    return this.http.get('banner',{headers:headers}).pipe(map(res => res));
  }
  getBannerSingle(id){
    let headers = new Headers();
    this.authService.loadToken();
    headers.append('Authorization', this.authService.authToken);
    headers.append( 'Content-Type', 'application/json' );
    return this.http.get('admin/banner/'+id,{headers:headers}).pipe(map(res => res));
  }


  addBanner(banner) {
    let headers = new Headers();
    this.authService.loadToken();
    headers.append('Authorization', this.authService.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post('admin/banner/new',banner, { headers: headers }).pipe(map(res => res));
  }

  updateBanner( id, banner) {
    let headers = new Headers();
    this.authService.loadToken();
    headers.append('Authorization', this.authService.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post('admin/banner/update/' + id, banner, { headers: headers }).pipe(map(res => res));
  }
  deleteBanner(bannerId){
    let headers = new Headers();
    this.authService.loadToken();
    headers.append('Authorization',this.authService.authToken);
    headers.append( 'Content-Type', 'application/json' );
    return this.http.get('admin/banner/delete/'+bannerId,{headers:headers}).pipe(map(res => res));
  }

}
