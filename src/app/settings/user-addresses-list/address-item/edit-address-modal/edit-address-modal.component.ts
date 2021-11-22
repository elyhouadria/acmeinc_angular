import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Address} from "../../../../models/address";
import {AddressService} from "../../../../services/address.service";
import {HttpErrorResponse} from "@angular/common/http";
import {FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {AuthenticationService} from "../../../../auth/authentication.service";
import {Router} from "@angular/router";
import {UserAddressesComponent} from "../../user-addresses.component";

@Component({
  selector: 'app-edit-address-modal',
  templateUrl: './edit-address-modal.component.html',
  styleUrls: ['./edit-address-modal.component.css']
})
export class EditAddressModalComponent implements OnInit, OnDestroy {

  editAddressForm: FormGroup = <FormGroup>{};


  editAddress!: Address;
  private userSub!: Subscription;
  private currentUserId!: number;
  selectedAddressSub!: Subscription;

  constructor(private addressServices: AddressService,
              private authService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.userSub = this.authService.currentUser.subscribe(authUser => {
      this.currentUserId = <number>authUser?.userId;
      console.log('authuser id: ' + authUser?.userId)
    });
    this.selectedAddressSub = this.addressServices.selectedAddressSource.subscribe((address: Address | null) => {
      this.editAddress = <Address>address;
      this.initEditAddressForm()
    });

  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
    this.selectedAddressSub.unsubscribe();
  }

  initEditAddressForm() {
    this.editAddressForm = new FormGroup({
      id: new FormControl(this.editAddress?.id, Validators.required),
      firstName: new FormControl(this.editAddress?.firstName, [
        Validators.required,
        Validators.pattern(/^[a-zA-Z-àáâãäåçèéêëìíîïðòóôõöùúûüýÿ' ]{2,26}$/)
      ]),
      lastName: new FormControl(this.editAddress?.lastName, [
        Validators.required,
        Validators.pattern(/^[a-zA-Z-àáâãäåçèéêëìíîïðòóôõöùúûüýÿ' ]{2,26}$/)
      ]),
      addressLine1: new FormControl(this.editAddress?.addressLine1, [
        Validators.required,
        Validators.pattern(/^[0-9a-zA-Z-'àáâãäåçèéêëìíîïðòóôõöùúûüýÿ' ]{5,95}$/)
      ]),
      addressLine2: new FormControl(this.editAddress?.addressLine2, [
        Validators.required,
        Validators.pattern(/^[0-9a-zA-Z-'àáâãäåçèéêëìíîïðòóôõöùúûüýÿ' ]{2,95}$/)
      ]),
      zipCode: new FormControl(this.editAddress?.zipCode, [
        Validators.required,
        Validators.pattern(/^[0-9a-zA-Z- ]{5,17}$/)]),
      city: new FormControl(this.editAddress?.city, [
        Validators.required,
        Validators.pattern(/^[a-zA-Z-àáâãäåçèéêëìíîïðòóôõöùúûüýÿ' ]{2,35}$/)]),
      country: new FormControl(this.editAddress?.country, [
        Validators.required,
        Validators.pattern(/^[a-zA-Z-àáâãäåçèéêëìíîïðòóôõöùúûüýÿ' ]{2,50}$/)])
    })
  }

  get firstName() {
    return this.editAddressForm.get('firstName');
  }

  get lastName() {
    return this.editAddressForm.get('lastName');
  }

  get addressLine1() {
    return this.editAddressForm.get('addressLine1');
  }

  get addressLine2() {
    return this.editAddressForm.get('addressLine2');
  }

  get zipCode() {
    return this.editAddressForm.get('zipCode');
  }

  get city() {
    return this.editAddressForm.get('city');
  }

  get country() {
    return this.editAddressForm.get('country');
  }


  onUpdateAddress(editForm: FormControl): void {
    let editedAddress: Address = this.editAddressForm.value;
    document.getElementById('close-edit-modal')!.click();
    editedAddress.acmeUser = {
      id: <number>this.currentUserId
    }
    this.addressServices.updateAddress(editedAddress).subscribe(
      (response: Address) => {
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )

  }
}
