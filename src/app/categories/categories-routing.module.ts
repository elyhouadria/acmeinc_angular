import {RouterModule, Routes} from "@angular/router";
import {CategoriesComponent} from "./categories.component";
import {CategoryDetailComponent} from "./category-detail/category-detail.component";
import {CategoryListComponent} from "./category-list/category-list.component";
import {NgModule} from "@angular/core";


const routes: Routes = [
  {
    path: '',
    component: CategoriesComponent,
    children: [
      {path: '', component: CategoryListComponent},
      {path: ':id', component: CategoryDetailComponent}
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CategoriesRoutingModule {}
