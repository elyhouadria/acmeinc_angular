import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FeaturesComponent} from "./features/features.component";
import { AuthGuard } from './services/auth-guard.service';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
/*  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },*/
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  //{ path: 'features', loadChildren: () => import('./features/features.module').then(m => m.FeaturesModule) }
  {
    path: '',
    component: FeaturesComponent,
    children: [
      { path: 'dashboard', canActivate: [AuthGuard], loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule) }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[]
})
export class AppRoutingModule { }


