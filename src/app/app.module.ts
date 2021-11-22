import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HeaderComponent} from './header/header.component';
import {CartComponent} from './cart/cart.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {JwtInterceptor} from "./auth/jwt-interceptor";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {AddUserModalComponent} from './header/add-user-modal/add-user-modal.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {CategoriesModule} from "./categories/categories.module";
import {ProductListModule} from "./product-list/product-list.module";
import {HomeModule} from "./home/home.module";
import {CommonModule, DatePipe} from "@angular/common";
import {ProductCartModule} from "./product-cart/product-cart.module";
import {CheckoutOrderModule} from "./checkout-order/checkout-order.module";
import { SearchResultPageComponent } from './search-result-page/search-result-page.component';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import { ProductPaginationComponent } from './product-pagination/product-pagination.component';
import {MatCardModule} from "@angular/material/card";
import {MatGridListModule} from "@angular/material/grid-list";


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    CartComponent,
    AddUserModalComponent,
    SearchResultPageComponent,
    ProductPaginationComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatListModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    CategoriesModule,
    ProductListModule,
    HomeModule,
    ProductCartModule,
    CheckoutOrderModule,
    MatCardModule,
    MatGridListModule
  ],
  providers: [DatePipe,{provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}],
  exports: [

  ],
  bootstrap: [AppComponent]
})

export class AppModule {}
