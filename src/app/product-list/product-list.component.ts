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

  @Input() public products: Product[] = [];
  public cartContent: ShoppingCartItem[] = [];
  public quantity: number = 1;

  constructor(private productServices: ProductService,
              private dataServices: DataServices,
              private cartService: ShoppingCartService) {}

  ngOnInit(): void {
    this.cartService.currentCartContent.subscribe(cartContent => this.cartContent = cartContent)
  }

  OnAddProductToCart(product: Product, quantity: number) {
    this.cartService.addProductToCart(product, quantity);
  }

}
