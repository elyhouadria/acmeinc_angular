import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import { AuthGuard } from './auth/auth-guard.service';
import {HomeComponent} from "./home/home.component";
import {ProductDetailsComponent} from "./product-list/product-details/product-details.component";
import {SearchResultPageComponent} from "./search-result-page/search-result-page.component";
import {ProductPaginationComponent} from "./product-pagination/product-pagination.component";


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'search/:keyword', component: SearchResultPageComponent},
  { path: 'search', component: SearchResultPageComponent},
  { path: 'product/:id', component: ProductDetailsComponent },
  {path: 'productpagination', component: ProductPaginationComponent},
  { path: 'settings', canActivate: [AuthGuard], loadChildren: () =>import('./settings/settings.module').then(m => m.SettingsModule)},
  { path: 'login', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'checkout', canActivate: [AuthGuard], loadChildren: () => import('./checkout-order/checkout-order.module').then(m => m.CheckoutOrderModule)},
  { path: 'categories', loadChildren: () =>import('./categories/categories.module').then(m => m.CategoriesModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
  providers:[]
})
export class AppRoutingModule { }


