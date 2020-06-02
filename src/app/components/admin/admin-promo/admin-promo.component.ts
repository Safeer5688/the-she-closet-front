import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs';
import { PromoService } from 'src/app/services/promo.service';

@Component({
  selector: 'app-admin-promo',
  templateUrl: './admin-promo.component.html',
  styleUrls: ['./admin-promo.component.css']
})
export class AdminPromoComponent implements OnInit,OnDestroy {

  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  promos:any[] = [];


  constructor(
    private promoService: PromoService
  ) {
   }

  ngOnDestroy(){
    this.dtTrigger.unsubscribe();
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.promoService.getAllAdmin().subscribe(data => {
      console.log(data);
      this.promos = JSON.parse(data["_body"])["data"];
      this.dtTrigger.next();
    });
  }

  dateToTimestamp(date){
    var date2 = new Date(Date.parse(date));
    return date2.getDate()+"/"+date2.getMonth()+"/"+date2.getFullYear()+" - "+(date2.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }));
  }

}
