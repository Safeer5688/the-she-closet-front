import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {

  constructor() { }
  getBaseUrl(){
    return "http://localhost:3000/"
  }
}
