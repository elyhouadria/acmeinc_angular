import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Address} from "../../../../models/address";
import {AddressService} from "../../../../services/address.service";
import {HttpErrorResponse} from "@angular/common/http";
import {BehaviorSubject, Subscription} from "rxjs";

@Component({
  selector: 'app-delete-address-modal',
  templateUrl: './delete-address-modal.component.html',
  styleUrls: ['./delete-address-modal.component.css']
})
export class DeleteAddressModalComponent implements OnInit, OnDestroy{
  private selectedAddressSub!: Subscription;
  deleteAddress!: Address;

  constructor(private addressServices: AddressService) { }

  ngOnInit(): void {
    this.selectedAddressSub = this.addressServices.selectedAddressSource.subscribe((address: Address|null) => {
      this.deleteAddress = <Address>address;
    });
  }

  ngOnDestroy() {
    this.selectedAddressSub.unsubscribe()
  }

  onDeleteAddress(id: number) {
    this.addressServices.deleteAddress(id).subscribe(
      (response: void) => {
        console.log(response);

      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
