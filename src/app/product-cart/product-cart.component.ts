import { Component, OnInit } from '@angular/core';
import {ShoppingCartItem} from "../models/shopping-cart-item";
import {ShoppingCartService} from "../services/shopping-cart.service";

@Component({
  selector: 'app-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.css']
})
export class ProductCartComponent implements OnInit {

  cartContent!: ShoppingCartItem[];

  constructor(private cartService: ShoppingCartService) { }

  ngOnInit(): void {
    this.cartService.currentCartContent
      .subscribe(cartContent => this.cartContent = cartContent);
  }

  removeCartItem(i: number) {
    this.cartService.removeCartItem(i);
  }
}
