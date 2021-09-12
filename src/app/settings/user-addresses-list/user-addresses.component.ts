import {Component, OnDestroy, OnInit} from '@angular/core';
import {Address} from "../../models/address";
import {Subscription} from "rxjs";
import {AddressService} from "../../services/address.service";
import {AuthenticationService} from "../../auth/authentication.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-user-addresses',
  templateUrl: './user-addresses.component.html',
  styleUrls: ['./user-addresses.component.css']
})
export class UserAddressesComponent implements OnInit, OnDestroy {

  private currentUser!: Subscription;
  currentUserId!: number;
  userAddresses!: Address[];


  constructor(private addressService: AddressService,
              private authService: AuthenticationService) { }

  //Get user Id and addresses on initialization with authentication service
  ngOnInit(): void {
    this.currentUser = this.authService.currentUser.subscribe(user => {
      this.currentUserId = <number>user?.userId;
    });
    this.getUserAddresses(this.currentUserId);
  }

  ngOnDestroy(): void {
    this.currentUser.unsubscribe()
  }

  //Get User addresses from backend
  public getUserAddresses(id: number) {
    this.addressService.getAddressesByUserId(id).subscribe(
      (response: Address[]) => {
        this.userAddresses = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    )
  }

  onOpenModal(address: Address | null, mode: string): void {
    const container = document.getElementById('new-address-button')
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      console.log('OnOpenModal Create Address')
      button.setAttribute('data-target', '#addAddressModal');
    }
    container!.appendChild(button);
    button.click();
  }
}
