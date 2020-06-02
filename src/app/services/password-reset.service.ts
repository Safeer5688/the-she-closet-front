import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
// import 'rxjs/add/operator/map';
import { map } from "rxjs/operators";
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PasswordResetService {

  constructor(
    private http:Http,
    private authService:AuthService
  ) { 
  }

  resetPassword(values){
    let headers = new Headers();
    this.authService.loadToken();
    headers.append('Authorization',this.authService.authToken);
    headers.append( 'Content-Type', 'application/json' );
    return this.http.post('users/changepassword',values,{headers:headers}).pipe(map(res => res));
  }

  forgetPassword(values){
    let headers = new Headers();
    this.authService.loadToken();
    headers.append('Authorization',this.authService.authToken);
    headers.append( 'Content-Type', 'application/json' );
    return this.http.post('users/forgetpassword',values,{headers:headers}).pipe(map(res => res));
  }
  sendVerificationLink(){
    let headers = new Headers();
    this.authService.loadToken();
    var user = this.authService.getUserInfo;
    headers.append('Authorization',this.authService.authToken);
    headers.append( 'Content-Type', 'application/json' );
    return this.http.post('users/sendverificationlink',user,{headers:headers}).pipe(map(res => res));
  }
  sendForgetPasswordLink(values){
    let headers = new Headers();
    headers.append( 'Content-Type', 'application/json' );
    return this.http.post('users/sendforgetpasswordlink',values,{headers:headers}).pipe(map(res => res));
  }
  
}
