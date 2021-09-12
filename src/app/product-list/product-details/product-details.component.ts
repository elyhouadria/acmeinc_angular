import {Component, OnDestroy, OnInit} from '@angular/core';
import {Product} from "../../models/product";
import {ProductService} from "../../services/product.service";
import {Subscription} from "rxjs";
import {ActivatedRoute, Params} from "@angular/router";
import {ShoppingCartItem} from "../../models/shopping-cart-item";
import {ShoppingCartService} from "../../services/shopping-cart.service";
import {OrderLine} from "../../models/orderLine";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {

  cartContent!: ShoppingCartItem[];
  product!: Product;
  id!: number;
  routeParamSub!: Subscription;
  quantity: number = 1;

  constructor(private productServices: ProductService,
              private route: ActivatedRoute,
              private cartService: ShoppingCartService ) { }

  ngOnInit(): void {
    this.routeParamSub = this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        console.log('product Id: ' + this.id);
        this.productServices.getProductById(this.id)
          .subscribe((product: Product) => {
            this.product = product;
            console.log('product response: ' + product.productName)
          })
      }
    )
    this.cartService.currentCartContent
      .subscribe(cartContent => this.cartContent = cartContent);
  }

  ngOnDestroy() {
    this.routeParamSub.unsubscribe()
  }

  onAddProductToCart(product: Product, quantity: number) {
    this.cartService.addProductToCart(product, quantity);
  }
}
