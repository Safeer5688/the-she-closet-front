import { Component, OnInit } from '@angular/core';
import {FlashMessagesService} from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { PasswordResetService } from 'src/app/services/password-reset.service';

@Component({
  selector: 'app-send-verification-link',
  templateUrl: './send-verification-link.component.html',
  styleUrls: ['./send-verification-link.component.css']
})
export class SendVerificationLinkComponent implements OnInit {

  constructor(
    private passwordResetService: PasswordResetService,
    private flashMessage:FlashMessagesService,
    private router:Router
  ) {
   }

  sendVerificationLink(){
    // console.log("sdjxkf")
    var sendLink = document.getElementById("SendVerification");
    var scrollup = document.getElementById("scrollUp");
    
    sendLink['disabled'] = true;
    sendLink['innerHTML'] = "Sending..";
    
    this.passwordResetService.sendVerificationLink().subscribe(response =>{
      let res = JSON.parse(response['_body']);
      if(!res.status){
        scrollup.click();
        this.flashMessage.show(res.msg, {cssClass: 'alert-danger', timeout: 3000});
        sendLink['disabled'] = false;
        sendLink['innerHTML'] = "Send";
      }else{
        scrollup.click();
        sendLink['disabled'] = false;
        sendLink['innerHTML'] = "SEND";
        this.router.navigate(['/']);
        this.flashMessage.show(res.msg, {cssClass: 'alert-success', timeout: 10000});
      }
    });
  }
  ngOnInit() {
  }

}
