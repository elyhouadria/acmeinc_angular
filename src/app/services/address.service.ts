import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {Address} from "../models/address";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn:'root'
})

export class AddressService {
  private apiServiceUrl = environment.apiBaseUrl;
  selectedAddressSource = new BehaviorSubject<Address | null>(null);



  constructor(private http: HttpClient) {
  }

  public setSelectedAddress(address: Address): Address {
    this.selectedAddressSource.next(address);
    return address
  }

  public getAddresses(): Observable<Address[]>{
    return this.http.get<Address[]>(`${this.apiServiceUrl}/address/all`)
  }

  public getAddressesByUserId(userId: number): Observable<Address[]>{
    return this.http.get<Address[]>(`${this.apiServiceUrl}/address/findAddressesByUserId/${userId}`)
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
