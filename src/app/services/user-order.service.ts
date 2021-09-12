import {Injectable} from "@angular/core";
import {UserOrder} from "../models/user-order";
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {OrderDetails} from "../models/order-details";

@Injectable({
  providedIn: 'root'
})

export class UserOrderService {

  private apiServiceUrl = environment.apiBaseUrl;

  //Source of truth for order details
  currentOrderSource = new BehaviorSubject<OrderDetails | null>(null);

  constructor(private http: HttpClient) {}

  public setCurrentOrder(orderDetails: OrderDetails) {
    this.currentOrderSource.next(orderDetails);
  }

  public addOrder(order: UserOrder): Observable<UserOrder> {
    return this.http.post<UserOrder>(`${this.apiServiceUrl}/userorder/add`, order);
  }

  public getOrdersByUserId(id: number): Observable<UserOrder[]>{
    return this.http.get<UserOrder[]>(`${this.apiServiceUrl}/address/findOrdersByUserId/${id}`)
  }

}
