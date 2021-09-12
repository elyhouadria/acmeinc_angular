import {NgModule} from "@angular/core";
import {ProductListComponent} from "../product-list/product-list.component";
import {FormsModule} from "@angular/forms";
import {CategoriesRoutingModule} from "../categories/categories-routing.module";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations:
    [
    ],
  imports: [
    FormsModule,
    CommonModule
  ],
  exports: [
  ]
})

export class HomeModule {

}
