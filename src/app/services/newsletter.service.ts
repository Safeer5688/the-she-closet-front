import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { map } from "rxjs/operators";
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class NewsletterService {

  constructor(
    private http: Http,
    private authService:AuthService
  ) { }

  getAll(){
    let headers = new Headers();
    this.authService.loadToken();
    headers.append('Authorization', this.authService.authToken);
    headers.append( 'Content-Type', 'application/json' );
    return this.http.get('admin/newsletter',{headers:headers}).pipe(map(res => res));
  }

  addNewsletter(email) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('newsletter/new',email, { headers: headers }).pipe(map(res => res));
  }
}

