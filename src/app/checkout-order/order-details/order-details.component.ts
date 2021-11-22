import {Component, OnInit} from '@angular/core';
import {UserOrder} from "../../models/user-order";
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {OrderDetails} from "../../models/order-details";
import {ActivatedRoute, Router} from "@angular/router";
import {UserOrderService} from "../../services/user-order.service";
import {ShoppingCartItem} from "../../models/shopping-cart-item";
import {Address} from "../../models/address";
import {HttpErrorResponse} from "@angular/common/http";
import {Shipping} from "../../models/shipping";
import {ShippingService} from "../../services/shipping.service";
import {AddressService} from "../../services/address.service";
import {ShoppingCartService} from "../../services/shopping-cart.service";
import {AuthenticationService} from "../../auth/authentication.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  private currentUser!: Subscription;

  shippings: Shipping[] = [];
  userAddresses: Address[] = [];
  cartContent: ShoppingCartItem[] = [];

  paymentTypes: string[] = ['credit_card', 'PayPal', 'Bank_Transfer'];
  selectedPaymentType!: string;
  totalPrice!: number;
  shippingPrice: number = 0;
  currentUserId!: number | undefined;

  orderDetailsForm!: FormGroup;

  userOrder: UserOrder = <UserOrder>{
    acmeUser: {
      'id': <number>this.currentUserId
    },
    shippingAddress: {},
    billingAddress: {},
    shipping: {}
  };


  constructor(private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private orderService: UserOrderService,
              private shippingService: ShippingService,
              private cartService: ShoppingCartService,
              private addressService: AddressService,
              private authService: AuthenticationService,
  ) {}

  ngOnInit(): void {
    this.cartService.currentCartContent
      .subscribe(cartContent => this.cartContent = cartContent);
    this.currentUser = this.authService.currentUser.subscribe(user => {
      this.currentUserId = user?.userId;
    });
    this.initForm();
    this.orderDetailsForm.patchValue({
      'payment': this.paymentTypes[0]
    });
    this.getTotalPrice(this.cartContent);

    this.getUserAddresses(this.currentUserId!);
    this.getShippings();

  }

  initForm() {
    this.orderDetailsForm = new FormGroup({
      shippingAddress: new FormControl(this.userOrder.shippingAddress, Validators.required),
      billingAddress: new FormControl(this.userOrder.billingAddress, Validators.required),
      shipping: new FormControl(this.userOrder.shipping, Validators.required),
      payment: new FormControl(this.selectedPaymentType, Validators.required)
    });
  }

  getTotalPrice(cartContent: ShoppingCartItem[]) {
    let price: number = 0;
    for (let i = 0; i < cartContent.length; i++) {
      price += cartContent[i].product.productPrice*cartContent[i].orderLine.quantity
    }
    this.totalPrice = Number((price + this.shippingPrice).toFixed(2));
    console.log(this.shippingPrice)
  }

  onSubmit(orderDetailsForm: NgForm) {
    this.userOrder.shippingAddress = {'id': this.orderDetailsForm.value['shippingAddress']};
    this.userOrder.billingAddress = {'id': this.orderDetailsForm.value['billingAddress']};
    this.userOrder.shipping = {'id': this.orderDetailsForm.value['shipping']};
    this.selectedPaymentType = this.orderDetailsForm.value['payment'];

    let userOrderDetails: OrderDetails = <OrderDetails>{
      userOrder: this.userOrder,
      cartContent: this.cartContent,
      totalPrice: <number>this.totalPrice,
      paymentType: this.selectedPaymentType
    }

    this.orderService.currentOrderSource.next(userOrderDetails);

    this.router.navigate(['payment'], {relativeTo: this.route});
  }

  public getUserAddresses(id: number) {
    this.addressService.getAddressesByUserId(id).subscribe(
      (response: Address[]) => {
        this.userAddresses = response;
        this.orderDetailsForm.patchValue({
          'shippingAddress': this.userAddresses[0].id,
          'billingAddress': this.userAddresses[0].id
        });
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    )
  }

  public getShippings() {
    this.shippingService.getShippings().subscribe(
      (response: Shipping[]) => {
        this.shippings = response;
        this.orderDetailsForm.patchValue({
          'shipping': this.shippings[0].id,
        });
        this.shippingPrice = this.shippings[0].shippingPrice;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    )
  }

  onShippingAddressChange(id: number) {
    this.userOrder.shippingAddress = {
      "id": <number>id
    }
    console.log("userOrder.shippingAddress: " + this.userOrder.shippingAddress.id)
  }

  onBillingAddressChange(id: number) {
    this.userOrder.billingAddress = {
      "id": <number>id
    }
    console.log("userOrder.billingAddress: " + this.userOrder.billingAddress.id)
  }

  onShippingTypeChange(id: number, shippingPrice: number) {
    this.userOrder.shipping = {
      "id": <number>id
    };
    this.shippingPrice = shippingPrice;
    console.log("onShippingTypeChangeId: " + this.userOrder.shipping.id)
    this.getTotalPrice(this.cartContent);
  }

  onPaymentTypeChange(paymentType: string) {
    this.selectedPaymentType = paymentType;
  }
}
