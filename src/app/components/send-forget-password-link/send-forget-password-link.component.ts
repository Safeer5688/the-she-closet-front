import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages'
import { PasswordResetService } from 'src/app/services/password-reset.service';

@Component({
  selector: 'app-send-forget-password-link',
  templateUrl: './send-forget-password-link.component.html',
  styleUrls: ['./send-forget-password-link.component.css']
})
export class SendForgetPasswordLinkComponent implements OnInit {

  email;
  constructor(
    private router: Router,
    private productService: ProductService,
    private route: ActivatedRoute,
    private flashMessage:FlashMessagesService,
    private passwordResetService:PasswordResetService,
  ) { 
  }

  onEmailSubmit(){
    var values ={
      email:this.email,
    }
    var submitemail = document.getElementById("submitemail");
    submitemail['disabled'] = true;
    submitemail['innerHTML'] = "Submitting..";
    if(!values.email ){
      submitemail['disabled'] = false;
      submitemail['innerHTML'] = "Submit";
      this.flashMessage.show("Email is required", {cssClass: 'alert-danger', timeout: 6000});
    }
    else{
        this.passwordResetService.sendForgetPasswordLink(values).subscribe(response =>{
          
          response = JSON.parse(response["_body"]);
          if(response.status){
            this.router.navigate(['/login']);
            this.flashMessage.show("Verification Link has been sent to your email address, do check spam folder. It might take few minutes.", {cssClass: 'alert-success', timeout: 5000});
          }
          else{
            submitemail['disabled'] = false;
            submitemail['innerHTML'] ="Submit";
            this.flashMessage.show(response["msg"], {cssClass: 'alert-danger', timeout: 6000});
          }
        });
      
    }
  }

  ngOnInit() {
  }

}
