import {Component, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {Address} from "../../../models/address";
import {AddressService} from "../../../services/address.service";
import { Subscription} from "rxjs";
import {AuthenticationService} from "../../../auth/authentication.service";

@Component({
  selector: 'app-address-item',
  templateUrl: './address-item.component.html',
  styleUrls: ['./address-item.component.css']
})
export class AddressItemComponent implements OnInit, OnChanges {

  @Input()addressItem!: Address;
  deleteAddress: Address | null = null;

  private userSub!: Subscription;
  private currentUserId: number | undefined;

  constructor(private addressServices: AddressService,
              private authService: AuthenticationService) {
  }

  ngOnChanges(changes: SimpleChanges) {
  }


  ngOnInit(): void {
    this.userSub = this.authService.currentUser.subscribe(authUser => {
      this.currentUserId = <number>authUser?.userId;
    });
  }

  public onOpenModal(address: Address | null, mode: string): void {
    const container = document.getElementById('address-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'edit') {
      this.addressServices.setSelectedAddress(<Address>address);
      console.log('open modal address:' + address?.addressLine1);
      console.log('address item: ' + this.addressItem.addressLine1);
      button.setAttribute('data-target', '#updateAddressModal');
    }
    if (mode === 'delete') {
      this.addressServices.setSelectedAddress(<Address>address);
      button.setAttribute('data-target', '#deleteAddressModal');
    }
    container!.appendChild(button)
    button.click();
    console.log('selected user ')
  }
}
