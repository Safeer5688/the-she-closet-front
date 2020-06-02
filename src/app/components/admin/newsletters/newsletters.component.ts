import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs';
import { NewsletterService } from 'src/app/services/newsletter.service';

@Component({
  selector: 'app-newsletters',
  templateUrl: './newsletters.component.html',
  styleUrls: ['./newsletters.component.css']
})
export class NewslettersComponent implements OnInit, OnDestroy {

  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  emails:any[] = [];

  constructor(private newsletterService: NewsletterService) {
    if (document.getElementById("script2")) {
      document.getElementById("script2").remove();
    }
    var script2 = document.createElement("script");
    script2.setAttribute("id", "script2");
    script2.setAttribute("src", "./assets/js/main.js");
    document.body.appendChild(script2);
    if (document.getElementsByClassName("mean-bar").length > 0) {
      for (let index = 0; index < document.getElementsByClassName("mean-bar").length; index++) {
        document.getElementsByClassName("mean-bar")[index].remove();

      }
    }
   }


  ngOnDestroy(){
    this.dtTrigger.unsubscribe();
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.newsletterService.getAll().subscribe(data => {
      this.emails = JSON.parse(data["_body"])["data"];
      console.log(this.emails)
      this.dtTrigger.next();
    });
  }

}
