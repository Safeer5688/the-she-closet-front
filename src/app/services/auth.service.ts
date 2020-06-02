import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
// import 'rxjs/add/operator/map';
import { map } from "rxjs/operators";
import { tokenNotExpired } from 'angular2-jwt';
import { UrlResolver } from '@angular/compiler';
import { ConstantsService } from './constants.service'

@Injectable({
  providedIn: 'root'
})



export class AuthService {
  authToken: any;
  user: any;
  baseUrl:String;

  constructor(private http: Http,
    private constantsService:ConstantsService) {
      this.baseUrl = constantsService.getBaseUrl();
     }
  
  registerUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.baseUrl+'users/register', user, { headers: headers }).pipe(map(res => res));
  }

  authenticateUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.baseUrl+'users/authenticate', user, { headers: headers }).pipe(map(res => res));
  }

  getProfile() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.baseUrl+'users/profile', { headers: headers }).pipe(map(res => res));
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }
  getUser() {
    // console.log(localStorage.getItem('user'))
    if (localStorage.getItem('user')) {
      return true;
    }
    else {
      return false;
    }
  }
  get getUserInfo() {
    return JSON.parse(localStorage.getItem('user'));
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  isActive(email) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    // return true;
    return this.http.get(this.baseUrl+'users/isactive/' + email, { headers: headers }).pipe(map(res => res));
  }

  isActive2() {
    var user = localStorage.getItem('user');
    user = JSON.parse(user);
    if(user['isActive']){
      return true;
    }else{
      return false;
    }
  }

  isAdmin() {
    var user = localStorage.getItem('user');
    user = JSON.parse(user);
    if (user['admin']) {
      return true;
    }
    return false;
  }

  loggedIn() {
    // console.log(localStorage.getItem('id_token'));
    return tokenNotExpired('id_token');
  }


  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.removeItem('id_token');
    localStorage.removeItem('user');
  }
}
