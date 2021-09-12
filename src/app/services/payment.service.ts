import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Payment} from "../models/payment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class PaymentService {
  private apiServiceUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public addPayment(payment: Payment): Observable<Payment> {
    return this.http.post<Payment>(`${this.apiServiceUrl}/payment/add`, payment);
  }

}
