import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Shipping} from "../models/shipping";


@Injectable({
  providedIn: 'root'
})

export class ShippingService {
  private apiServiceUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getShippings(): Observable<Shipping[]>{
    return this.http.get<Shipping[]>(`${this.apiServiceUrl}/shipping/all`);
  }
}
