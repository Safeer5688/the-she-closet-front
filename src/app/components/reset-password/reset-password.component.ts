import { Component, OnInit } from '@angular/core';
import {FlashMessagesService} from 'angular2-flash-messages';
import { AuthService } from 'src/app/services/auth.service';
import { PasswordResetService } from 'src/app/services/password-reset.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(
    private flashMessage:FlashMessagesService,
    private authService:AuthService,
    private passwordResetService:PasswordResetService,
    private router:Router
  ) {
   }

  ngOnInit() {
  }

  resetPassword(values){
    var changeButton = document.getElementById("changeButton");
    changeButton['disabled'] = true;
    changeButton['innerHTML'] = "Resetting..";
    if(!values.newPassword || !values.newPassword2 || !values.previousPassword){
      changeButton['disabled'] = false;
      changeButton['innerHTML'] = "Reset";
      this.flashMessage.show("All the fields are required", {cssClass: 'alert-danger', timeout: 6000});
    }
    else{
      if(values.newPassword != values.newPassword2){
        changeButton['disabled'] = false;
        changeButton['innerHTML'] = "Reset";
        this.flashMessage.show("New and repeat passwords do not match", {cssClass: 'alert-danger', timeout: 6000});
      }
      else{
        this.passwordResetService.resetPassword(values).subscribe(response =>{
          
          response = JSON.parse(response["_body"]);
          if(response.status){
            this.router.navigate(['']);
            this.flashMessage.show(response["msg"], {cssClass: 'alert-success', timeout: 5000});
          }
          else{
            changeButton['disabled'] = false;
            changeButton['innerHTML'] ="Reset";
            this.flashMessage.show(response["msg"], {cssClass: 'alert-danger', timeout: 6000});
          }
        });
      }
    }
  }
}
