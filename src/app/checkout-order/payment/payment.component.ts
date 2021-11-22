import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ShoppingCartItem} from "../../models/shopping-cart-item";
import {UserOrder} from "../../models/user-order";
import {Subscription} from "rxjs";
import {UserOrderService} from "../../services/user-order.service";
import {OrderDetails} from "../../models/order-details";
import {Payment} from "../../models/payment";
import {PaymentService} from "../../services/payment.service";
import {AuthenticationService} from "../../auth/authentication.service";
import {AuthUser} from "../../auth/authUser";
import {OrderlineService} from "../../services/orderline.service";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit, OnDestroy {

  orderDetailsSource!: Subscription;
  currentUserSource!: Subscription;

  currentUserId!: number;
  userOrder!: UserOrder | undefined;
  cartContent!: ShoppingCartItem[] | undefined;
  totalPrice: number | undefined;
  paymentType!: string | undefined

  ccDetailsForm!: FormGroup

  constructor(private fb: FormBuilder,
              private orderService: UserOrderService,
              private paymentService: PaymentService,
              private authService: AuthenticationService,
              private orderLineService: OrderlineService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.orderDetailsSource = this.orderService.currentOrderSource.subscribe((orderDetails: OrderDetails | null) => {
      this.userOrder = orderDetails?.userOrder;
      this.cartContent = orderDetails?.cartContent;
      this.totalPrice = orderDetails?.totalPrice;
      this.paymentType = orderDetails?.paymentType;
    })
    this.currentUserSource = this.authService.currentUser.subscribe((user: AuthUser | null) => {
      this.currentUserId = <number>user?.userId;
    })
    this.initForm()
  }

  ngOnDestroy() {
    this.currentUserSource.unsubscribe()
    this.orderDetailsSource.unsubscribe()
  }

  initForm() {
    this.ccDetailsForm = new FormGroup({
      ccNumber: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[0-9]{16}$/)]),
      ccExpiryDate: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/)]),
      ccCvcCode: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[0-9]{3}$/)])
    })
  }

  get ccNumber(){
    return this.ccDetailsForm.get('ccNumber');
  }
  get ccExpiryDate(){
    return this.ccDetailsForm.get('ccExpiryDate');
  }
  get ccCvcCode(){
    return this.ccDetailsForm.get('ccCvcCode');
  }



  //Save new Payment, new order/payment id, send data to userOrderService and then save new orderLines/orderId
  //Empty local storage send user to confirmation page
  submitCardDetails(ccDetailsForm: FormGroup) {
    let newPayment: Payment = <Payment>{
      amount: <number>this.totalPrice,
      currency: "Euro",
      paymentStatus: "Pending",
      paymentType: <string>this.paymentType
    }
    this.paymentService.addPayment(newPayment).subscribe((newPayment: Payment) => {
      this.userOrder!.payment = {
        id: newPayment.id
      }
      this.userOrder!.acmeUser = {
        id: this.currentUserId
      }
      this.userOrder!.orderStatus = "Pending";
      this.userOrder!.totalPrice = <number>this.totalPrice;
      this.orderService.addOrder(this.userOrder!).subscribe((order: UserOrder) => {
        this.userOrder!.id = order.id
        let newOrderDetails: OrderDetails = <OrderDetails>{
          userOrder: this.userOrder,
          totalPrice: this.totalPrice,
          cartContent: this.cartContent,
          paymentType: this.paymentType
        }
        this.orderService.currentOrderSource.next(newOrderDetails);
        for (let i = 0; i < this.cartContent!.length; i++) {

          this.cartContent![i].orderLine.userOrder = {
            id : <number>this.userOrder?.id };

/*          let newOrderLine: OrderLine = <OrderLine>{
            quantity: <number>this.cartContent![i].orderLine.quantity,
            product: {
              id: <number><number>this.cartContent![i].product.id
            },
            userOrder: {
              id: <number>order.id
            },
            orderLinePrice: <number>this.cartContent![i].orderLine.quantity
          }*/
          this.orderLineService.addOrderLine(this.cartContent![i].orderLine).subscribe();
        }
      });
    });
    localStorage.removeItem('cart');
    this.router.navigate(['confirmation'], {relativeTo: this.route});
  }
}

