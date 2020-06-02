import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/take';
import { BannerService } from 'src/app/services/banner.service';

@Component({
  selector: 'app-admin-banner-form',
  templateUrl: './admin-banner-form.component.html',
  styleUrls: ['./admin-banner-form.component.css']
})
export class AdminBannerFormComponent implements OnInit {
  banner:any = {};
  id;

  constructor(
    private router: Router,
    private flashMessage: FlashMessagesService,
    private bannerService: BannerService,
    private route: ActivatedRoute,
  ) { 
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.banner = this.bannerService.getBannerSingle(this.id).take(1).subscribe(data => {
        console.log(JSON.parse(data["_body"]));
        this.banner = JSON.parse(data["_body"])["data"];
        console.log(this.banner);
      });
    }
  }

  save(banner) {
    var newbanner = {
      image:banner.image,
      imageId:banner.imageId
    }
    if (this.id) {

      console.log(newbanner);

      this.bannerService.updateBanner(this.id, newbanner).subscribe(data => {
        data = JSON.parse(data["_body"]);
        console.log(data);
        if (data.status) {
          this.flashMessage.show(data["msg"], { cssClass: 'alert-success', timeout: 5000 });
          this.router.navigate(['/admin/banners']);
        }
        else {
          this.flashMessage.show(data["msg"], { cssClass: 'alert-danger', timeout: 5000 });
        }
      });
    } else {
      console.log(newbanner);
      this.bannerService.addBanner(newbanner).subscribe(data => {
        data = JSON.parse(data["_body"]);
        console.log(data);
        if (data.status) {
          this.flashMessage.show(data["msg"], { cssClass: 'alert-success', timeout: 5000 });
          this.router.navigate(['/admin/banners']);
        }
        else {
          this.flashMessage.show(data["msg"], { cssClass: 'alert-danger', timeout: 5000 });
        }
      });
    }
  }

  delete() {
    if (!confirm('Are you sure you want to delete this Banner?')) return;

    this.bannerService.deleteBanner(this.id).subscribe(data => {
      data = JSON.parse(data["_body"]);
      console.log(data);
      if (data.status) {
        this.flashMessage.show(data["msg"], { cssClass: 'alert-success', timeout: 5000 });
        this.router.navigate(['/admin/banners']);
      }
      else {
        this.flashMessage.show(data["msg"], { cssClass: 'alert-danger', timeout: 5000 });
      }
    });
  }

  ngOnInit() {
  }

  

}
