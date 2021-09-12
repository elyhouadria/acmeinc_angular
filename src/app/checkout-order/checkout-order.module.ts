import {NgModule} from "@angular/core";
import {PaymentComponent} from "./payment/payment.component";
import {CheckoutOrderComponent} from "./checkout-order.component";
import {CheckoutOrderRoutingModule} from "./checkout-order-routing.module";
import { ConfirmationComponent } from './confirmation/confirmation.component';
import {FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import { OrderDetailsComponent } from './order-details/order-details.component';
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    PaymentComponent,
    CheckoutOrderComponent,
    ConfirmationComponent,
    OrderDetailsComponent
  ],
  imports: [
    CheckoutOrderRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],


})

export class CheckoutOrderModule {

}
