import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../models/product";
import {HttpErrorResponse} from "@angular/common/http";
import {ProductService} from "../services/product.service";
import {CategoryService} from "../services/category.service";
import {Category} from "../models/category";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  //public products: Product[] = [];
  public categories: Category[] = [];

  constructor(private productServices: ProductService,
              private categoryServices: CategoryService) { }

  ngOnInit(): void {
  /*  this.getProducts();*/
    this.getCategories();
  }

  /*public getProducts(): void {
    this.productServices.getProducts().subscribe(
      (response: Product[]) => {
        this.products = response;
        console.log("product list :");
        console.log(this.products);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }*/

  public getCategories(): void {
    this.categoryServices.getCategories().subscribe(
      (response: Category[]) => {
        this.categories = response;
        console.log("CategoryList :");
        console.log(this.categories);
      }
    )
  }
}
