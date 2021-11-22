import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {AuthenticationService} from "../../auth/authentication.service";
import {UserOrderService} from "../../services/user-order.service";
import {HttpErrorResponse} from "@angular/common/http";
import {OrderHistoryItem} from "../../models/order-history-item";



@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css']
})

export class UserOrdersComponent implements OnInit, OnDestroy {

  private currentUser!: Subscription;
  currentUserId!: number;
  orderHistory!: OrderHistoryItem[];

  constructor(private userOrderService: UserOrderService,
              private authService: AuthenticationService) { }

  //Get current user
  ngOnInit(): void {
    this.currentUser = this.authService.currentUser.subscribe(user => {
      this.currentUserId = <number>user?.userId;
    });
    this.getUserOrders(this.currentUserId);
  }

  ngOnDestroy() {
    this.currentUser.unsubscribe();
  }

  //Get User Orders from backend
  public getUserOrders(id: number){
    this.userOrderService.getOrdersByUserId(id).subscribe(
      (response: OrderHistoryItem[]) => {
        this.orderHistory = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    )
  }
}
