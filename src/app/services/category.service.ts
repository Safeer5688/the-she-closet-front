import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
// import 'rxjs/add/operator/map';
import { map } from "rxjs/operators";
import { AuthService } from './auth.service';
import { ConstantsService } from './constants.service'


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  baseUrl:String;
  constructor(
    private http: Http,
    private authService: AuthService,
    private constantsService:ConstantsService
  ) {
    this.baseUrl = constantsService.getBaseUrl();
   }

  getCategorySingle(id){
    let headers = new Headers();
    headers.append('Authorization', this.authService.authToken);
    headers.append( 'Content-Type', 'application/json' );
    return this.http.get(this.baseUrl+'admin/category/'+id,{headers:headers}).pipe(map(res => res));
  }

  getCategories(){
    let headers = new Headers();
    headers.append( 'Content-Type', 'application/json' );
    return this.http.get(this.baseUrl+'allcategories',{headers:headers}).pipe(map(res => res));
  }

  addCategory(category) {
    let headers = new Headers();
    this.authService.loadToken();
    headers.append('Authorization', this.authService.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.baseUrl+'admin/category/new',category, { headers: headers }).pipe(map(res => res));
  }

  updateCategory( id, category) {
    let headers = new Headers();
    this.authService.loadToken();
    headers.append('Authorization', this.authService.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.baseUrl+'admin/category/update/' + id, category, { headers: headers }).pipe(map(res => res));
  }
  deleteCategory(categoryId){
    let headers = new Headers();
    this.authService.loadToken();
    headers.append('Authorization',this.authService.authToken);
    headers.append( 'Content-Type', 'application/json' );
    return this.http.get(this.baseUrl+'admin/category/delete/'+categoryId,{headers:headers}).pipe(map(res => res));
  }

}
