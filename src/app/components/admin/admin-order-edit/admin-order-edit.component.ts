import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import {ActivatedRoute} from '@angular/router';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-admin-order-edit',
  templateUrl: './admin-order-edit.component.html',
  styleUrls: ['./admin-order-edit.component.css']
})
export class AdminOrderEditComponent implements OnInit {
  order: any;
  subtotal:Number;
  id:string;
  constructor(
    private router:Router,
    private flashMessage:FlashMessagesService,
    private orderService:OrderService,
    private route:ActivatedRoute,
  ) { 
    
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id){
      this.order = this.orderService.getOrder(this.id).take(1).subscribe(data => {
         console.log(JSON.parse(data["_body"]));
         this.order = JSON.parse(data["_body"])["data"];
         this.subtotal=0;
         var p;
         this.order.items.forEach(element => {
            p=parseInt(element.price)*element.quantity;
           this.subtotal = this.subtotal + p;
         }); 
      });
    }
   }

  updateStatus(value){
    console.log(this.id);
    console.log(value.status);
    var scrollup = document.getElementById("scrollUp");
    this.orderService.updateOrderStatus(value.status,this.id).subscribe(data => {
      data = JSON.parse(data["_body"]);
      console.log(data);
      if(data.status){
        scrollup.click();
        this.flashMessage.show(data["msg"], {cssClass: 'alert-success', timeout: 10000});
      }
      else{
        scrollup.click();
        this.flashMessage.show(data["msg"], {cssClass: 'alert-danger', timeout: 10000});
      }
    });
  }

  ngOnInit() {
  }
  dateToTimestamp(date){
    var date2 = new Date(Date.parse(date));
    return date2.getDate()+"/"+date2.getMonth()+"/"+date2.getFullYear()+" - "+(date2.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }));
  }

}
