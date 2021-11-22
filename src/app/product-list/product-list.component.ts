import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Product} from "../models/product";
import {ProductService} from "../services/product.service";
import {DataServices} from "../services/data.services";
import {ShoppingCartItem} from "../models/shopping-cart-item";
import {ShoppingCartService} from "../services/shopping-cart.service";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  @Input() public products: Product[] | null = [];
  public cartContent: ShoppingCartItem[] = [];

  constructor(private productServices: ProductService,
              private dataServices: DataServices,
              private cartService: ShoppingCartService) {
  }

  ngOnInit(): void {
    this.cartService.currentCartContent.subscribe(cartContent => this.cartContent = cartContent)
  }

  // Add product to cart. If product is already in cart update quantity of relevant SLItem.

  OnAddProductToCart(product: Product, htmlInputElement: HTMLInputElement) {
    let quantity = Number(htmlInputElement.value)
    let shoppingCartItemIndex: number | null = null;
    for (let i = 0; i <= this.cartContent.length-1; i++) {
      if (this.cartContent[i].product.id === product.id) {
        shoppingCartItemIndex = i
      }
    }
    if (shoppingCartItemIndex !== null){
      this.cartContent[shoppingCartItemIndex].orderLine.quantity += quantity;
      this.cartContent[shoppingCartItemIndex].orderLine.orderLinePrice = this.cartContent[shoppingCartItemIndex].orderLine.quantity*this.cartContent[shoppingCartItemIndex].product.productPrice;
      shoppingCartItemIndex = null;
      this.cartService.changeCartContent(this.cartContent.slice());
    }
    else {
      this.cartService.addProductToCart(product, quantity);
    }
  }
}
