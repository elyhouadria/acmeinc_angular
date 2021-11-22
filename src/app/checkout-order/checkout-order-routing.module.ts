import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AuthGuard} from "../auth/auth-guard.service";
import {CheckoutOrderComponent} from "./checkout-order.component";
import {PaymentComponent} from "./payment/payment.component";
import {ConfirmationComponent} from "./confirmation/confirmation.component";
import {OrderDetailsComponent} from "./order-details/order-details.component";

const checkoutOrderRoutes: Routes = [
  {
    path: '',
    component: CheckoutOrderComponent,
    canActivate: [AuthGuard],
    children: [
      {path: '', component: OrderDetailsComponent},
      { path: 'payment', component: PaymentComponent},
      { path: 'payment/confirmation', component: ConfirmationComponent}
    ]
  }
]

@NgModule({
  imports:[RouterModule.forChild(checkoutOrderRoutes)],
  exports: [RouterModule]
  })
export class CheckoutOrderRoutingModule {}
