import {Component, OnInit} from '@angular/core';
import {ShoppingCartItem} from "../models/shopping-cart-item";
import {ShoppingCartService} from "../services/shopping-cart.service";
import {AddressService} from "../services/address.service";
import {AuthenticationService} from "../auth/authentication.service";
import {Subscription} from "rxjs";
import {Address} from "../models/address";
import {ShippingService} from "../services/shipping.service";
import {Shipping} from "../models/shipping";
import {UserOrder} from "../models/user-order";
import { FormBuilder} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {UserOrderService} from "../services/user-order.service";

@Component({
  selector: 'app-checkout-order',
  templateUrl: './checkout-order.component.html',
  styleUrls: ['./checkout-order.component.css']
})
export class CheckoutOrderComponent implements OnInit {

  private currentUser!: Subscription;
  userAddresses: Address[] = [];
  shippings: Shipping[] = [];
  currentUserId!: number | undefined;
  cartContent: ShoppingCartItem[] = [];
  selectedPaymentType!: string;
  shippingPrice!: number;


  userOrder: UserOrder = <UserOrder>{
    acmeUser: {
      'id': <number>this.currentUserId
    },
    shippingAddress: {},
    billingAddress: {},
    shipping: {}
  };

  totalPrice!: number;

  constructor(private cartService: ShoppingCartService,
              private addressService: AddressService,
              private authService: AuthenticationService,
              private shippingService: ShippingService,
              private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private orderService: UserOrderService) {}

  ngOnInit(): void {
    this.cartService.currentCartContent
      .subscribe( cartContent => this.cartContent = cartContent);
    this.currentUser = this.authService.currentUser.subscribe(user => {
      this.currentUserId = user?.userId;
    });
  }







}
