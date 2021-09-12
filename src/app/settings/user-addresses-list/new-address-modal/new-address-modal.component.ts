import {Component, OnDestroy, OnInit} from '@angular/core';
import {Address} from "../../../models/address";
import {AddressService} from "../../../services/address.service";
import {HttpErrorResponse} from "@angular/common/http";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../../auth/authentication.service";
import { Subscription} from "rxjs";

@Component({
  selector: 'app-new-address-modal',
  templateUrl: './new-address-modal.component.html',
  styleUrls: ['./new-address-modal.component.css']
})
export class NewAddressModalComponent implements OnInit, OnDestroy {

  private userSub!: Subscription;
  currentUserId!: number | undefined;
  addAddressForm!: FormGroup;

  constructor(private addressServices: AddressService,
              private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.initAddAddressForm()
    this.userSub = this.authService.currentUser.subscribe( authUser => {
      this.currentUserId= <number>authUser?.userId;
      this.initAddAddressForm()
      console.log('current userId: ' + this.currentUserId);
    });
  }
  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  initAddAddressForm(){
    this.addAddressForm = new FormGroup({
      firstName: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z-àáâãäåçèéêëìíîïðòóôõöùúûüýÿ' ]{2,26}$/)]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z-àáâãäåçèéêëìíîïðòóôõöùúûüýÿ' ]{2,26}$/)]),
      addressLine1: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[0-9a-zA-Z-'àáâãäåçèéêëìíîïðòóôõöùúûüýÿ' ]{5,45}$/)]),
      addressLine2: new FormControl('', [
        Validators.pattern(/^[0-9a-zA-Z-'àáâãäåçèéêëìíîïðòóôõöùúûüýÿ' ]{2,45}$/)]),
      zipCode: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[0-9a-zA-Z- ]{5,17}$/)]),
      city: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z-àáâãäåçèéêëìíîïðòóôõöùúûüýÿ' ]{2,35}$/)]),
      country: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z-àáâãäåçèéêëìíîïðòóôõöùúûüýÿ' ]{2,50}$/)])
    })
  }
  get firstName() {
    return this.addAddressForm?.get('firstName');
  }
  get lastName() {
    return this.addAddressForm?.get('lastName');
  }
  get addressLine1() {
    return this.addAddressForm?.get('addressLine1');
  }
  get addressLine2() {
    return this.addAddressForm?.get('addressLine2');
  }
  get zipCode() {
    return this.addAddressForm?.get('zipCode');
  }
  get city() {
    return this.addAddressForm?.get('city');
  }
  get country() {
    return this.addAddressForm?.get('country');
  }

  //Add address with form value and insert user FK before sending request
  onAddAddress(addAddressForm: FormGroup) {
    let newAddress: Address = this.addAddressForm.value;
    newAddress.acmeUser = {
      "id": <number>this.currentUserId
    }
    document.getElementById('add-address-form')!.click();
    this.addressServices.addAddress(newAddress).subscribe(
      (response: Address) => {
        this.addAddressForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        this.addAddressForm.reset();
      }
    );
  }
}
