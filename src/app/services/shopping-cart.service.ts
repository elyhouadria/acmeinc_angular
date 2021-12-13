import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {ShoppingCartItem} from "../models/shopping-cart-item";
import {Product} from "../models/product";
import {OrderLine} from "../models/orderLine";

@Injectable({
  providedIn: 'root'
})

export class ShoppingCartService {

  constructor() {}
  //Source of truth for cart content
  cartContentSource = new BehaviorSubject<ShoppingCartItem []>([]);
  currentCartContent = this.cartContentSource.asObservable();
  cartContent: ShoppingCartItem[] = [];

  //Save cart to local storage on update
  changeCartContent(cartItems: ShoppingCartItem[]) {
    this.cartContentSource.next(cartItems);
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }

  //Retrieve cart from local storage
  public checkLocalCart() {
    const localCart: ShoppingCartItem[] = JSON.parse(<string>localStorage.getItem('cart'));
    if (!localCart) {
      return
    }
    if (localCart) {
      this.cartContentSource.next(localCart.slice());
    }
  }

  //Add product to cart and update local storage
  public addProductToCart(product: Product, quantity: number) {
    let newOrderLine: OrderLine;
    newOrderLine = <OrderLine>{
      product:{
        id: product.id
      },
      quantity: quantity,
      orderLinePrice: product.productPrice*quantity
    }
    let newCartItem: ShoppingCartItem;
    newCartItem = <ShoppingCartItem>{
      product: <Product>product,
      orderLine: <OrderLine>newOrderLine
    };
    this.cartContent.push(newCartItem);
    this.changeCartContent(this.cartContent.slice());
    this.cartContentSource.next(this.cartContent.slice());
  }

  //Remove item from cart list and update local storage
  public removeCartItem(i: number) {
    this.cartContent?.splice(i,1);
    this.cartContentSource.next(this.cartContent.slice());
    localStorage.setItem('cart', JSON.stringify(this.cartContent))
  }
}
