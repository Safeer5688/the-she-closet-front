import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
// import 'rxjs/add/operator/map';
import { map } from "rxjs/operators";
import { AuthService } from './auth.service';
import { ConstantsService } from './constants.service'


@Injectable({
  providedIn: 'root'
})
export class PlagCheckerService {
  baseUrl:any;
  constructor(
    private http: Http,
    private authService: AuthService,
    private constantService:ConstantsService
  ) {
    this.baseUrl=this.constantService.getBaseUrl();
   }

  compare(url1, url2) {
    let headers = new Headers();
    var pictures={
      picture1:url1,
      picture2:url2
    };
    this.authService.loadToken();
    headers.append('Authorization',this.authService.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.baseUrl+'users/compare', pictures, { headers: headers }).pipe(map(res => res));
  }

}
