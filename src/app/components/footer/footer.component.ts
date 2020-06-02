import { Component, OnInit } from '@angular/core';
import {FlashMessagesService} from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { NewsletterService } from 'src/app/services/newsletter.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(
    private newsletterService: NewsletterService,
    private flashMessage:FlashMessagesService,
    private router:Router
  ) { }

  ngOnInit() {
  }

  addNewsletter(newsletter){
    console.log(newsletter.EMAIL);
    var newNewsletter = {
      email : newsletter.EMAIL
    }
    var subscribeButton = document.getElementById("mc-embedded-subscribe");
    var scrollup = document.getElementById("scrollUp");
    
    subscribeButton['disabled'] = true;
    subscribeButton['value'] = "Subscribing..";
    var emailform = document.getElementById("mce-EMAIL");
    var email = emailform['value'];
    emailform['value'] = '';
    emailform['placeholder'] = "Please Wait";
    
    this.newsletterService.addNewsletter(newNewsletter).subscribe(response =>{
      
      let res = JSON.parse(response['_body']);
      if(!res.status){
        scrollup.click();
        emailform['value'] = email;
        this.flashMessage.show(res.msg, {cssClass: 'alert-danger', timeout: 3000});
        subscribeButton['disabled'] = false;
        subscribeButton['value'] = "Send";
      }
      else{
        emailform['placeholder'] = "Email Address";
        scrollup.click();
        subscribeButton['disabled'] = false;
        subscribeButton['value'] = "Send";
        this.flashMessage.show("You have successfully subscribed to the newsletter.", {cssClass: 'alert-success', timeout: 10000});
      }
    });
  }



}
