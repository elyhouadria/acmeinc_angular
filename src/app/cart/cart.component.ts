import {Component, OnDestroy, OnInit} from '@angular/core';
import {ShoppingCartItem} from "../models/shopping-cart-item";
import {ShoppingCartService} from "../services/shopping-cart.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public cartContent!: ShoppingCartItem[];

  constructor(private cartService: ShoppingCartService) {}


  ngOnInit(): void {
    this.cartService.currentCartContent.subscribe(cartContent => this.cartContent = cartContent)
  }

  public removeCartItem(i: number) {
    this.cartContent?.splice(i,1);
    this.cartService.cartContentSource.next(this.cartContent.slice());
  }
}
