import { Component, OnInit } from '@angular/core';
import { PromoService } from 'src/app/services/promo.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/take';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-admin-promo-form',
  templateUrl: './admin-promo-form.component.html',
  styleUrls: ['./admin-promo-form.component.css']
})
export class AdminPromoFormComponent implements OnInit {

  promo:any = {};
  id;

  constructor(
    private router: Router,
    private flashMessage: FlashMessagesService,
    private promoService: PromoService,
    private route: ActivatedRoute,
  ) {
    
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.promo = this.promoService.getPromo(this.id).take(1).subscribe(data => {
        console.log(JSON.parse(data["_body"]));
        this.promo = JSON.parse(data["_body"])["data"];
        console.log(this.promo);
      });
    }
   }

  
   save(promo) {
    var newPromo = {
      code:promo.code,
      isPercent: promo.isPercent,
      isActive: promo.isActive,
      amount: promo.amount,
      expireDate: "2019-11-09"
    }
    if (this.id) {

      console.log(newPromo);

      this.promoService.updatePromo(this.id, newPromo).subscribe(data => {
        data = JSON.parse(data["_body"]);
        console.log(data);
        if (data.status) {
          this.flashMessage.show(data["msg"], { cssClass: 'alert-success', timeout: 5000 });
          this.router.navigate(['/admin/promos']);
        }
        else {
          this.flashMessage.show(data["msg"], { cssClass: 'alert-danger', timeout: 5000 });
        }
      });
    } else {
      console.log(newPromo);
      this.promoService.addPromo(newPromo).subscribe(data => {
        data = JSON.parse(data["_body"]);
        console.log(data);
        if (data.status) {
          this.flashMessage.show(data["msg"], { cssClass: 'alert-success', timeout: 5000 });
          this.router.navigate(['/admin/promos']);
        }
        else {
          this.flashMessage.show(data["msg"], { cssClass: 'alert-danger', timeout: 5000 });
        }
      });
    }
  }

  delete() {
    if (!confirm('Are you sure you want to delete this product?')) return;

    this.promoService.deletePromo(this.id).subscribe(data => {
      data = JSON.parse(data["_body"]);
      console.log(data);
      if (data.status) {
        this.flashMessage.show(data["msg"], { cssClass: 'alert-success', timeout: 5000 });
        this.router.navigate(['/admin/promos']);
      }
      else {
        this.flashMessage.show(data["msg"], { cssClass: 'alert-danger', timeout: 5000 });
      }
    });
  }

  ngOnInit() {
  }

}
