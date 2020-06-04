import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
// import 'rxjs/add/operator/map';
import { map } from "rxjs/operators";
import { AuthService } from './auth.service';
import { ConstantsService } from './constants.service'


@Injectable({
  providedIn: 'root'
})
export class DesignGeneratorService {
  baseUrl:any;
  baseUrl2:any;
  constructor(
    private http: Http,
    private authService: AuthService,
    private constantService:ConstantsService
  ) {
    this.baseUrl=this.constantService.getBaseUrl();
    this.baseUrl2 = "http://192.168.43.53:5000/";
   }

  generateDesign(url1, url2, range1, range2, range3, range4, range5) {
    let headers = new Headers();
    var pictures={
      picture1:url1,
      picture2:url2,
      range1:range1,
      range2:range2,
      range3:range3,
      range4:range4,
      range5:range5,
    };
    this.authService.loadToken();
    headers.append('Authorization',this.authService.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.baseUrl2+'gendesign', pictures, { headers: headers }).pipe(map(res => res));
  }

}
