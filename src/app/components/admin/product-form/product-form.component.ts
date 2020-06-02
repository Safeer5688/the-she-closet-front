import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/take';
import { CategoryService } from 'src/app/services/category.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  product:any = {};
  id;
  constructor(
    private router: Router,
    private flashMessage: FlashMessagesService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
  ) {
    
    this.categoryService.getCategories().subscribe(data => {
      // console.log(data);
      // console.log(JSON.parse(data["_body"]));
      this.categories$ = JSON.parse(data["_body"])["data"];
      // console.log(this.categories$);
    });
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.product = this.productService.get(this.id).take(1).subscribe(data => {
        // console.log(JSON.parse(data["_body"]));
        this.product = JSON.parse(data["_body"])["data"];
        for(var i=0;i<4;i++) {
          this.product['imageId'+(i+1)] = JSON.parse(data["_body"])["data"].imageUrls[i].imageId;
          this.product['imageLink'+(i+1)] = JSON.parse(data["_body"])["data"].imageUrls[i].link;
        };

        this.product['s'] = JSON.parse(data["_body"])["data"].sizes[0].isAvailable;
        this.product['m'] = JSON.parse(data["_body"])["data"].sizes[1].isAvailable;
        this.product['l'] = JSON.parse(data["_body"])["data"].sizes[2].isAvailable;
        this.product['xl'] = JSON.parse(data["_body"])["data"].sizes[3].isAvailable;
        this.product['xxl'] = JSON.parse(data["_body"])["data"].sizes[4].isAvailable;
        this.product['xxxl'] = JSON.parse(data["_body"])["data"].sizes[5].isAvailable;
        
        console.log(this.product);
      });
    }
  }

  save(product) {
    var newProduct = {
      title: product.title,
      price: product.price,
      oldPrice: product.oldPrice,
      description: product.description,
      category: product.category,
      inStock: product.inStock,
      isSale: product.isSale
    }
    newProduct['sizes'] = [
      { name: "s", isAvailable: product.s },
      { name: "m", isAvailable: product.m },
      { name: "l", isAvailable: product.l },
      { name: "xl", isAvailable: product.xl },
      { name: "xxl", isAvailable: product.xxl },
      { name: "xxxl", isAvailable: product.xxxl }
    ];
    newProduct['imageUrls'] = [
      { link: product.imageLink1, imageId: product.imageId1 },
      { link: product.imageLink2, imageId: product.imageId2 },
      { link: product.imageLink3, imageId: product.imageId3 },
      { link: product.imageLink4, imageId: product.imageId4 }
    ];
    if (this.id) {

      console.log(newProduct);
      this.productService.update(this.id, newProduct).subscribe(data => {
        data = JSON.parse(data["_body"]);
        console.log(data);
        if (data.status) {
          this.flashMessage.show(data["msg"], { cssClass: 'alert-success', timeout: 5000 });
          this.router.navigate(['/admin/products']);
        }
        else {
          this.flashMessage.show(data["msg"], { cssClass: 'alert-danger', timeout: 5000 });
        }
      });
    } else {
      console.log(newProduct);
      this.productService.create(newProduct).subscribe(data => {
        data = JSON.parse(data["_body"]);
        console.log(data);
        if (data.status) {
          this.flashMessage.show(data["msg"], { cssClass: 'alert-success', timeout: 5000 });
          this.router.navigate(['/admin/products']);
        }
        else {
          this.flashMessage.show(data["msg"], { cssClass: 'alert-danger', timeout: 5000 });
        }
      });
    }
  }

  delete() {
    if (!confirm('Are you sure you want to delete this product?')) return;

    this.productService.delete(this.id).subscribe(data => {
      data = JSON.parse(data["_body"]);
      console.log(data);
      if (data.status) {
        this.flashMessage.show(data["msg"], { cssClass: 'alert-success', timeout: 5000 });
        this.router.navigate(['/admin/products']);
      }
      else {
        this.flashMessage.show(data["msg"], { cssClass: 'alert-danger', timeout: 5000 });
      }
    });
  }

  ngOnInit() {
  }

}
