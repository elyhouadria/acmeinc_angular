import {NgModule} from "@angular/core";
import {CategoryListComponent} from "./category-list/category-list.component";
import {RouterModule} from "@angular/router";
import {CategoriesRoutingModule} from "./categories-routing.module";
import {CommonModule} from "@angular/common";
import {CategoryDetailComponent} from "./category-detail/category-detail.component";
import {FormsModule} from "@angular/forms";
import {ProductListModule} from "../product-list/product-list.module";
import {CategoriesComponent} from "./categories.component";


@NgModule({
  declarations: [
    CategoriesComponent,
    CategoryListComponent,
    CategoryDetailComponent
  ],
  exports: [
    CategoryListComponent
  ],
  imports: [
    RouterModule,
    CategoriesRoutingModule,
    FormsModule,
    ProductListModule,
    CommonModule
  ]
})

export class CategoriesModule {
}
