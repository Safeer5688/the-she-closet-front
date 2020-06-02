import { Component, OnInit, Input,OnChanges} from '@angular/core';
import { Product } from 'src/app/models/product';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnChanges {
  @Input('product') product: Product;
  @Input('show-actions') showActions = true;
  // @Input('shopping-cart') shoppingCart;
  quantity:number;

  constructor(
    private cartService:ShoppingCartService,
    ) {

    }
    over(){
      var changeSrc = document.getElementById(this.product._id);
      var image:any = this.product.imageUrls;
      changeSrc['src']=image[1]['link'];
    }
    out(){
      var changeSrc = document.getElementById(this.product._id);
      var image:any = this.product.imageUrls;
      changeSrc['src']=image[0]['link'];
    }

  ngOnChanges(){
    this.quantity = this.cartService.productCount(this.product);
  }
}
