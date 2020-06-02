import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import { BsNavbarComponent } from '../bs-navbar/bs-navbar.component';
import { ValidateService} from '../../services/validate.service';

@Component({
  providers:[BsNavbarComponent],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: String;
  password: String;

  constructor(
    private validateService:ValidateService,
    private authService:AuthService,
    private router:Router,
    private flashMessage:FlashMessagesService,
    private navbar: BsNavbarComponent
    ) {
     }

  ngOnInit() {
    
  }

  onLoginSubmit(){
    const user = {
      email: this.email,
      password: this.password
    }
    if(!this.validateService.validateEmail(user.email)){
      this.flashMessage.show("Please enter correct email",{cssClass:'alert-danger',timeout:3000});
      return false;
    }
    this.authService.authenticateUser(user).subscribe(data => {
      data = JSON.parse(data["_body"]);
      
      if(data["success"]){
        this.authService.storeUserData(data["token"],data["user"]);
        this.flashMessage.show('You are now logged in', {cssClass: 'alert-success', timeout: 5000});
        // this.navbar.setUser();
        this.router.navigate(['']);
      }
      else{
        this.flashMessage.show(data["msg"], {cssClass: 'alert-danger', timeout: 5000});
        this.router.navigate(['login']);
      }
    });

  }

}
