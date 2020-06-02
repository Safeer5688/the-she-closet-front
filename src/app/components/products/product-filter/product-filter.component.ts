import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {
  categories$;
  @Input('category') category;
  constructor(private categoryService:CategoryService) {
    this.categoryService.getCategories().subscribe(data => {
      this.categories$ =  JSON.parse(data["_body"])["data"];
    });
   }

  ngOnInit() {
  }

}
