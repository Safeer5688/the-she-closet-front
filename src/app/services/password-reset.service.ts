import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
// import 'rxjs/add/operator/map';
import { map } from "rxjs/operators";
import { AuthService } from './auth.service';
import { ConstantsService } from './constants.service'

@Injectable({
  providedIn: 'root'
})
export class PasswordResetService {
  baseUrl:String;
  constructor(
    private http:Http,
    private authService:AuthService,
    private constantsService:ConstantsService
  ) { 
    this.baseUrl = constantsService.getBaseUrl();
  }

  resetPassword(values){
    let headers = new Headers();
    this.authService.loadToken();
    headers.append('Authorization',this.authService.authToken);
    headers.append( 'Content-Type', 'application/json' );
    return this.http.post(this.baseUrl+'users/changepassword',values,{headers:headers}).pipe(map(res => res));
  }

  forgetPassword(values){
    let headers = new Headers();
    this.authService.loadToken();
    headers.append('Authorization',this.authService.authToken);
    headers.append( 'Content-Type', 'application/json' );
    return this.http.post(this.baseUrl+'users/forgetpassword',values,{headers:headers}).pipe(map(res => res));
  }
  sendVerificationLink(){
    let headers = new Headers();
    this.authService.loadToken();
    var user = this.authService.getUserInfo;
    headers.append('Authorization',this.authService.authToken);
    headers.append( 'Content-Type', 'application/json' );
    return this.http.post(this.baseUrl+'users/sendverificationlink',user,{headers:headers}).pipe(map(res => res));
  }
  sendForgetPasswordLink(values){
    let headers = new Headers();
    headers.append( 'Content-Type', 'application/json' );
    return this.http.post(this.baseUrl+'users/sendforgetpasswordlink',values,{headers:headers}).pipe(map(res => res));
  }
  
}
