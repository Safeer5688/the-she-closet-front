import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Injectable()
export class ActiveGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router,
        private flashMessage: FlashMessagesService ) {
    }
    canActivate(){
        if(this.authService.isActive2()){
            return true;
        }
        else{
            this.flashMessage.show('You need to verify your email account in order to proceed.', {cssClass: 'alert-danger', timeout: 5000});
            this.router.navigate(['/sendverificationlink']);
            return false;
        }
    }

}

