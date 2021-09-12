import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ProductListComponent} from "./product-list.component";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import { ProductDetailsComponent } from './product-details/product-details.component';
import {ProductCartModule} from "../product-cart/product-cart.module";

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailsComponent
  ],
  exports: [
    ProductListComponent,
    ProductDetailsComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    ProductCartModule
  ]
})
export class ProductListModule {}
