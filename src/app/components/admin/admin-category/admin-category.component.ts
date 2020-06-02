import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.css']
})

export class AdminCategoryComponent implements OnInit,OnDestroy {

  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  categories:any[] = [];


  constructor(
    private categoryService: CategoryService
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
    this.categoryService.getCategories().subscribe(data => {
      console.log(data);
      this.categories = JSON.parse(data["_body"])["data"];
      this.dtTrigger.next();
    });
  }
}
