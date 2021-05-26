import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryComponent } from './category/category.component';
import { ProductComponent } from './product/product.component';
import { SearchResultPageComponent } from './search-result-page/search-result-page.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';
import { OrderPaymentComponent } from './order-payment/order-payment.component';
import { UserAddressesComponent } from './user-addresses/user-addresses.component';
import {RouterModule} from "@angular/router";
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserOrdersComponent } from './user-orders/user-orders.component';
import { CreateOrderComponent } from './create-order/create-order.component';
import { NotFoundComponent } from './not-found/not-found.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CategoriesComponent,
    CategoryComponent,
    ProductComponent,
    SearchResultPageComponent,
    CreateAccountComponent,
    OrderConfirmationComponent,
    OrderPaymentComponent,
    UserAddressesComponent,
    UserDetailsComponent,
    UserOrdersComponent,
    CreateOrderComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {path: '', component: HomeComponent},
      {path: 'category/:id', component: CategoryComponent},
      {path: 'categories', component: CategoriesComponent},
      {path: 'product/:id', component: CategoryComponent},
      {path: 'searchproducts/:searchterms', component: CategoryComponent},
      {path: 'createaccount', component: CreateAccountComponent},
      {path: 'userorders/:id', component: UserOrdersComponent},
      {path: 'createorder', component: CreateOrderComponent},
      {path: 'orderpayment', component: OrderPaymentComponent},
      {path: 'useraddresses/:id', component: UserAddressesComponent},
      {path: 'userdetails/:id', component: UserDetailsComponent},
      {path: '**', component: NotFoundComponent},
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
