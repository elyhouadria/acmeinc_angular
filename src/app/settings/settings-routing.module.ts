import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {SettingsComponent} from "./settings.component";
import {AuthGuard} from "../auth/auth-guard.service";
import {UserDetailsComponent} from "./user-details/user-details.component";
import {UserAddressesComponent} from "./user-addresses-list/user-addresses.component";
import {EditAddressModalComponent} from "./user-addresses-list/address-item/edit-address-modal/edit-address-modal.component";
import {NewAddressModalComponent} from "./user-addresses-list/new-address-modal/new-address-modal.component";
import {UserOrdersComponent} from "./user-orders/user-orders.component";


const settingRoutes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'orders', component: UserOrdersComponent},
      { path: 'profile', component: UserDetailsComponent },
      {
        path: 'addresses',
        component: UserAddressesComponent,
        children:[
          {
            path: '',
            component: NewAddressModalComponent
          },
          {
            path: '',
            component: EditAddressModalComponent
          }
        ]
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(settingRoutes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule {}
