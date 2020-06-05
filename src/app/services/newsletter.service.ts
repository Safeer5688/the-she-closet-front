import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { map } from "rxjs/operators";
import { AuthService } from './auth.service';
import { ConstantsService } from './constants.service'


@Injectable({
  providedIn: 'root'
})
export class NewsletterService {
  baseUrl:String;
  constructor(
    private http: Http,
    private authService:AuthService,
    private constantsService:ConstantsService
  ) {
    this.baseUrl = constantsService.getBaseUrl();
   }

  getAll(){
    let headers = new Headers();
    this.authService.loadToken();
    headers.append('Authorization', this.authService.authToken);
    headers.append( 'Content-Type', 'application/json' );
    return this.http.get(this.baseUrl+'admin/newsletter',{headers:headers}).pipe(map(res => res));
  }

  addNewsletter(email) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.baseUrl+'newsletter/new',email, { headers: headers }).pipe(map(res => res));
  }
}

