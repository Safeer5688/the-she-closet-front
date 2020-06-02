import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
// import 'rxjs/add/operator/map';
import { map } from "rxjs/operators";
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private http: Http,
    private authService: AuthService
  ) { }

  getCategorySingle(id){
    let headers = new Headers();
    headers.append('Authorization', this.authService.authToken);
    headers.append( 'Content-Type', 'application/json' );
    return this.http.get('admin/category/'+id,{headers:headers}).pipe(map(res => res));
  }

  getCategories(){
    let headers = new Headers();
    headers.append( 'Content-Type', 'application/json' );
    return this.http.get('allcategories',{headers:headers}).pipe(map(res => res));
  }

  addCategory(category) {
    let headers = new Headers();
    this.authService.loadToken();
    headers.append('Authorization', this.authService.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post('admin/category/new',category, { headers: headers }).pipe(map(res => res));
  }

  updateCategory( id, category) {
    let headers = new Headers();
    this.authService.loadToken();
    headers.append('Authorization', this.authService.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post('admin/category/update/' + id, category, { headers: headers }).pipe(map(res => res));
  }
  deleteCategory(categoryId){
    let headers = new Headers();
    this.authService.loadToken();
    headers.append('Authorization',this.authService.authToken);
    headers.append( 'Content-Type', 'application/json' );
    return this.http.get('admin/category/delete/'+categoryId,{headers:headers}).pipe(map(res => res));
  }

}
