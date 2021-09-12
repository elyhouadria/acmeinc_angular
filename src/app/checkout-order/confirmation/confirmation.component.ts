import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {UserOrderService} from "../../services/user-order.service";
import {OrderDetails} from "../../models/order-details";
import {UserOrder} from "../../models/user-order";
import {ShoppingCartItem} from "../../models/shopping-cart-item";
import {ActivatedRoute, Router} from "@angular/router";
import {ShoppingCartService} from "../../services/shopping-cart.service";

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit, OnDestroy {

  orderDetailsSource!: Subscription;
  userOrder!: UserOrder | null;
  totalPrice!: number;
  cartContent: ShoppingCartItem[] = [];
  paymentType!: string;

  constructor(private orderService: UserOrderService,
              private cartService: ShoppingCartService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.orderDetailsSource = this.orderService.currentOrderSource.subscribe((orderDetails: OrderDetails | null) => {
      this.userOrder = <UserOrder>orderDetails?.userOrder;
      this.totalPrice = <number>orderDetails?.totalPrice;
      this.cartContent = <ShoppingCartItem[]>orderDetails?.cartContent;
      this.paymentType = <string>orderDetails?.paymentType;
    });
    setTimeout(() => {
      this.cartService.cartContentSource.next([]);
      this.orderService.currentOrderSource.next(null);
      this.cartService.cartContent = [];
      localStorage.removeItem('cart');
      this.router?.navigate(['/home'])
    }, 5000)
  }

  ngOnDestroy() {
    this.orderDetailsSource?.unsubscribe()
  }
}
