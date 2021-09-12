import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../models/product";
import {HttpErrorResponse} from "@angular/common/http";
import {ProductService} from "../services/product.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public products: Product[] = [];

  constructor(private productServices: ProductService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  public getProducts(): void {
    this.productServices.getProducts().subscribe(
      (response: Product[]) => {
        this.products = response;
        console.log("product list :")
        console.log(this.products)
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}
