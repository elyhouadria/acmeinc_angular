import {Component, OnDestroy, OnInit} from '@angular/core';
import {Category} from "../../models/category";
import {CategoryService} from "../../services/category.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit, OnDestroy {

  categoriesList: Category[] = []
  categoriesSub!: Subscription;

  constructor(private categoryServices: CategoryService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getCategories()
  }

  public getCategories(): void {
    this.categoriesSub = this.categoryServices.getCategories().subscribe((response: Category[]) => {
        this.categoriesList = response
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    );
  }

  onCategoryNav(id: number): void {
    this.router.navigate([`${id}`], {relativeTo: this.route, queryParamsHandling: 'preserve'})
  }

  ngOnDestroy(): void {
    this.categoriesSub.unsubscribe();
  }

}
