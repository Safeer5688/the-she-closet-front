import { Component, OnInit } from '@angular/core';
import { ValidateService} from '../../services/validate.service';
import { AuthService} from '../../services/auth.service'
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;

  constructor(
    private validateService:ValidateService,
    private flashMessage:FlashMessagesService,
    private authService:AuthService,
    private router: Router
  ) {
   }

  ngOnInit() {
  }
  onRegisterSubmit(){
    const user = {
      name: this.name,
      email: this.email,
      password: this.password
    }
    //Required Fields
    if(!this.validateService.validateRegister(user)){
      this.flashMessage.show('Please fill in all fields',{cssClass:'alert-danger',timeout:3000});
      return false;
    }
    if(!this.validateService.validateEmail(user.email)){
      this.flashMessage.show("Please enter correct email",{cssClass:'alert-danger',timeout:3000});
      return false;
    }
    // Register User
    this.authService.registerUser(user).subscribe(data => {
      var a = JSON.parse(data["_body"])
      if(a.success){
        this.flashMessage.show('Verification Link has been sent to your email. Click the link in email and login again',{cssClass:'alert-success',timeout:10000});
        this.router.navigate(['/login']);
      }
      else{
        this.flashMessage.show(a.msg,{cssClass:'alert-danger',timeout:3000});
        this.router.navigate(['/register']);
      }
    });
  }
}
