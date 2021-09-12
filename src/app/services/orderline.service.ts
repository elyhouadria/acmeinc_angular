import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../models/product";
import {OrderLine} from "../models/orderLine";


@Injectable({
  providedIn: 'root'
})

export class OrderlineService {
  private apiServiceUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient){}

  public getOrderLines(): Observable<OrderLine[]> {
    return this.http.get<OrderLine[]>(`${this.apiServiceUrl}/orderline/all`);
  }

  public addOrderLine(orderLine: OrderLine): Observable<OrderLine>{
    console.log("adding orderLines...")
    return this.http.post<OrderLine>(`${this.apiServiceUrl}/orderline/add`, orderLine);
  }

  public updateOrderLine(orderline: OrderLine): Observable<OrderLine>{
    return this.http.put<OrderLine>(`${this.apiServiceUrl}/orderline/update`, orderline);
  }

  public deleteOrderLine(orderLineId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServiceUrl}/orderline/delete`)
  }
}
