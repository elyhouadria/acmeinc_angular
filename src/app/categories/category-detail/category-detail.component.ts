import {Component, OnDestroy, OnInit} from '@angular/core';
import {CategoryService} from "../../services/category.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Category} from "../../models/category";
import {Product} from "../../models/product";
import {ProductService} from "../../services/product.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css']
})
export class CategoryDetailComponent implements OnInit, OnDestroy {

    category!: Category;
    id!: number;
    products: Product[] = [];

    routeParamSub!: Subscription;
    quantity: any;

    constructor(private categoryServices: CategoryService,
                private route: ActivatedRoute,
                private router: Router,
                private productServices: ProductService) {}

    ngOnInit(): void {
      this.routeParamSub = this.route.params.subscribe(
        (params: Params) => {
          this.id= +params['id'];
          this.categoryServices.getCategoryById(this.id)
            .subscribe((category: Category) => {
              this.category = category;
            });
        }
      )
      this.getCategoryProducts(this.id);
    }

    ngOnDestroy() {
      this.routeParamSub.unsubscribe();
    }

  getCategoryProducts(id: number): void{
      this.productServices.getProductsByCategoryId(id)
        .subscribe((products: Product[]) => {
        this.products = products;
      });
    }

  addProductToCart(product: Product, quantity: any) {

  }
}
