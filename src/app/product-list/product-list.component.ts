import {Component, OnInit} from '@angular/core';
import {Product} from "../models/product";
import {ProductServices} from "../services/product.services";
import {HttpErrorResponse} from "@angular/common/http";
import {OrderLine} from "../models/orderLine";
import {DataServices} from "../services/data.services";
import {OrderlineServices} from "../services/orderline.services";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  public products!: Product[];
  public orderLines!: OrderLine[];
  public orderLinesString!: String[];
  public productsString!: String[];
  public quantity: number = 1;

  constructor(private productServices: ProductServices,
              private dataServices: DataServices) {
    this.products = [];
  }

  ngOnInit(): void {
    this.getProducts();
    this.dataServices.currentOrderLines.subscribe(orderLines => this.orderLines = orderLines);
    this.dataServices.currentOrderLinesString.subscribe(orderLinesString => this.orderLinesString = orderLinesString);
    this.dataServices.currentProducts.subscribe(products => this.products = products);
    this.dataServices.currentProductsString.subscribe(productsString =>this.productsString = productsString);
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

  public addProductToCart(product: Product, quantity: number) {
    console.log("Product :");
    console.log(product);
    console.log("Quantity :");
    console.log(quantity);
    let newOrderLine: OrderLine;
    newOrderLine = <OrderLine>{
      orderLineProductId: product.productId,
      orderlineQuantity: quantity
    }
    this.orderLines.push(newOrderLine);
    let newOrderLineString = product.productName + ": " + product.productPrice + " x " + quantity + "ttl = " + product.productPrice * quantity + "€";

    this.orderLinesString.push(newOrderLineString);
    this.dataServices.changeOrderLines(this.orderLines);
    this.dataServices.changeOrderLinesString(this.orderLinesString);

    console.log("orderLines:");
    console.log(this.orderLines);
    console.log("orderLinesString:");
    console.log(this.orderLinesString);
  }

  /*  onLogin(loginForm: NgForm): void {
     document.getElementById('user-login-form')!.click();
     console.log("LoginForm Value: " + loginForm.value);
     this.jwtClientService.generateToken(loginForm.value).subscribe(
       (response: any) => {
         console.log(response);
         this.jwtClientService.welcome(response);
         loginForm.reset();
       },
       (error: HttpErrorResponse) =>{
         alert(error.message)
         loginForm.reset();
       }
     );
   }*/

}
