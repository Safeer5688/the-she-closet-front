import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit, OnDestroy {
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  orders:any[] = [];

  constructor(private orderService: OrderService) {
    
   }


  ngOnDestroy(){
    this.dtTrigger.unsubscribe();
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.orderService.getAll().subscribe(data => {
      this.orders = JSON.parse(data["_body"])["data"];
      this.dtTrigger.next();
    });
  }

  dateToTimestamp(date){
    var date2 = new Date(Date.parse(date)); 
    return date2.getFullYear()+"/"+date2.getMonth()+"/"+date2.getDate()+" - "+(date2.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }));
  }


}
