import {NgModule} from "@angular/core";
import {ProductCartComponent} from "./product-cart.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    ProductCartComponent
  ],
  exports: [
    ProductCartComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild([{path: '', component: ProductCartComponent}])
  ]
})

export class ProductCartModule {}

