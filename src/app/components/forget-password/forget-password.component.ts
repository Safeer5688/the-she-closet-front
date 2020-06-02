import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages'
import { PasswordResetService } from 'src/app/services/password-reset.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  userid;
  otp;
  password;
  constructor(
    private router: Router,
    private productService: ProductService,
    private route: ActivatedRoute,
    private flashMessage:FlashMessagesService,
    private passwordResetService:PasswordResetService,
  ) {
    
    this.userid = this.route.snapshot.paramMap.get('userid');
    this.otp = this.route.snapshot.paramMap.get('otp');
    // if(!this.userid || !this.otp){
    //   this.flashMessage.show('Invalid Link', {cssClass: 'alert-danger', timeout: 5000});
    //   this.router.navigate(['/']);
    // }
    console.log(this.userid+" "+this.otp)
  }

  onPasswordSubmit(){
    var values ={
      password:this.password,
      otp:this.otp,
      userid:this.userid
    }
    var changeButton = document.getElementById("changeButton");
    changeButton['disabled'] = true;
    changeButton['innerHTML'] = "Resetting..";
    if(!values.password ){
      changeButton['disabled'] = false;
      changeButton['innerHTML'] = "Reset";
      this.flashMessage.show("Password is required", {cssClass: 'alert-danger', timeout: 6000});
    }
    else{
      
        this.passwordResetService.forgetPassword(values).subscribe(response =>{
          
          response = JSON.parse(response["_body"]);
          if(response.status){
            this.router.navigate(['/login']);
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


  ngOnInit() {
  }

}
