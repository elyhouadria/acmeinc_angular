import {NgModule} from "@angular/core";
import {SettingsComponent} from "./settings.component";
import {SettingsRoutingModule} from "./settings-routing.module";
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserAddressesComponent } from './user-addresses-list/user-addresses.component';
import { AddressItemComponent } from './user-addresses-list/address-item/address-item.component';
import {CommonModule} from "@angular/common";
import { EditAddressModalComponent } from './user-addresses-list/address-item/edit-address-modal/edit-address-modal.component';
import { DeleteAddressModalComponent } from './user-addresses-list/address-item/delete-address-modal/delete-address-modal.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { NewAddressModalComponent } from './user-addresses-list/new-address-modal/new-address-modal.component';
import { UserOrdersComponent } from './user-orders/user-orders.component';
import {MatTableModule} from "@angular/material/table";


@NgModule({
  declarations: [
    SettingsComponent,
    UserDetailsComponent,
    UserAddressesComponent,
    AddressItemComponent,
    EditAddressModalComponent,
    DeleteAddressModalComponent,
    NewAddressModalComponent,
    UserOrdersComponent,
  ],
    imports: [
        SettingsRoutingModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatTableModule
    ]
})
export class SettingsModule {}
