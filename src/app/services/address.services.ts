import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Address} from "../models/address";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn:'root'
})

export class AddressServices {
  private apiServiceUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
  }

  public getAddresses(): Observable<Address[]>{
    return this.http.get<Address[]>(`${this.apiServiceUrl}/address/all`)
  }

  public addAddress(address: Address): Observable<Address>{
    return this.http.post<Address>(`${this.apiServiceUrl}/address/add`, address);
  }

  public updateAddress(address: Address): Observable<Address>{
    return this.http.put<Address>(`${this.apiServiceUrl}/address/update`, address);
  }

  public deleteAddress(addressId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServiceUrl}/address/delete/${addressId}`);
  }

}
