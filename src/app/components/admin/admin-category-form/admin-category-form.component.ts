import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/take';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-admin-category-form',
  templateUrl: './admin-category-form.component.html',
  styleUrls: ['./admin-category-form.component.css']
})
export class AdminCategoryFormComponent implements OnInit {

  category:any = {};
  id;

  constructor(
    private router: Router,
    private flashMessage: FlashMessagesService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.category = this.categoryService.getCategorySingle(this.id).take(1).subscribe(data => {
        console.log(JSON.parse(data["_body"]));
        this.category = JSON.parse(data["_body"])["data"];
        console.log(this.category);
      });
    }
   }

  
   save(category) {
    var newcategory = {
      title:category.title,
      name: category.name,
    }
    if (this.id) {

      console.log(newcategory);

      this.categoryService.updateCategory(this.id, newcategory).subscribe(data => {
        data = JSON.parse(data["_body"]);
        console.log(data);
        if (data.status) {
          this.flashMessage.show(data["msg"], { cssClass: 'alert-success', timeout: 5000 });
          this.router.navigate(['/admin/categories']);
        }
        else {
          this.flashMessage.show(data["msg"], { cssClass: 'alert-danger', timeout: 5000 });
        }
      });
    } else {
      console.log(newcategory);
      this.categoryService.addCategory(newcategory).subscribe(data => {
        data = JSON.parse(data["_body"]);
        console.log(data);
        if (data.status) {
          this.flashMessage.show(data["msg"], { cssClass: 'alert-success', timeout: 5000 });
          this.router.navigate(['/admin/categories']);
        }
        else {
          this.flashMessage.show(data["msg"], { cssClass: 'alert-danger', timeout: 5000 });
        }
      });
    }
  }

  delete() {
    if (!confirm('Are you sure you want to delete this product?')) return;

    this.categoryService.deleteCategory(this.id).subscribe(data => {
      data = JSON.parse(data["_body"]);
      console.log(data);
      if (data.status) {
        this.flashMessage.show(data["msg"], { cssClass: 'alert-success', timeout: 5000 });
        this.router.navigate(['/admin/categories']);
      }
      else {
        this.flashMessage.show(data["msg"], { cssClass: 'alert-danger', timeout: 5000 });
      }
    });
  }

  ngOnInit() {
  }

}
