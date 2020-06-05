import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
// import 'rxjs/add/operator/map';
import { map } from "rxjs/operators";
import { AuthService } from './auth.service';
import { ConstantsService } from './constants.service';

@Injectable({
  providedIn: 'root'
})
export class PromoService {
  baseUrl:String;
  constructor(
    private http: Http,
    private authService: AuthService,
    private constantsService:ConstantsService
  ) {
    this.baseUrl = constantsService.getBaseUrl();
   }

  getPromo(id){
    let headers = new Headers();
    headers.append('Authorization', this.authService.authToken);
    headers.append( 'Content-Type', 'application/json' );
    return this.http.get(this.baseUrl+'admin/promo/'+id,{headers:headers}).pipe(map(res => res));
  }

  getAllAdmin() {
    let headers = new Headers();
    this.authService.loadToken();
    headers.append('Authorization', this.authService.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.baseUrl+'admin/promo', { headers: headers }).pipe(map(res => res));
  }

  addPromo(promo) {
    let headers = new Headers();
    this.authService.loadToken();
    headers.append('Authorization', this.authService.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.baseUrl+'admin/promo/new', promo, { headers: headers }).pipe(map(res => res));
  }

  updatePromo( id, promo) {
    let headers = new Headers();
    this.authService.loadToken();
    headers.append('Authorization', this.authService.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.baseUrl+'admin/promo/update/' + id, promo, { headers: headers }).pipe(map(res => res));
  }
  deletePromo(promoId){
    let headers = new Headers();
    this.authService.loadToken();
    headers.append('Authorization',this.authService.authToken);
    headers.append( 'Content-Type', 'application/json' );
    return this.http.get(this.baseUrl+'admin/promo/delete/'+promoId,{headers:headers}).pipe(map(res => res));
  }

}
