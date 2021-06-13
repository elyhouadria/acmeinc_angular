import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {User} from "../models/user";
import {HttpErrorResponse} from "@angular/common/http";
import {UserServices} from "../services/user.services";
import {OrderLine} from "../models/orderLine";
import {ProductServices} from "../services/product.services";
import {OrderlineServices} from "../services/orderline.services";
import {Product} from "../models/product";
import {DataServices} from "../services/data.services";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public orderLines!: OrderLine[];
  public products!: Product[];
  public productsString!: String[];


  constructor(private userServices: UserServices,
              private productServices: ProductServices,
              private orderLineServices: OrderlineServices,
              private dataServices: DataServices
              ) {
    this.orderLines = [];
  }



  ngOnInit(): void {

    console.log(this.products);
    this.dataServices.currentProducts.subscribe(products => this.products = products);
    this.dataServices.currentProductsString.subscribe(productsString =>this.productsString = productsString);

  }


  public onOpenModal(user: User | null, mode: string): void {
    const container = document.getElementById('mainNavBar')
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (mode === 'add') {
      button.setAttribute('data-target', '#addUserModal');
    }
    if (mode === 'login') {
      button.setAttribute('data-target', '#loginModal');
    }
    container!.appendChild(button);
    button.click();
  }

  public onAddUser(addUserForm: NgForm): void {
    document.getElementById('add-user-form')!.click();
    this.userServices.addUser(addUserForm.value).subscribe(
      (response: User) => {
        console.log(response);
        addUserForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addUserForm.reset();
      }
    );
  }

  public getProducts(): void {
    this.getProducts();
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

  public getProductNameById(id: number): string {
    let productName: string = "";
    this.productServices.getProductById(id).subscribe(
      (response: Product) => {
        productName = response.productName;

      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
    return productName;
  }

  public searchProducts(key: string): void{
    const results: Product[] = [];
    for (const product of this.products){
      if(product.productName.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || product.productDescription.toLowerCase().indexOf(key.toLowerCase()) !== -1){
        results.push(product);
      }
    }
    this.products= results;
    if(results.length === 0 || !key){
      this.getProducts();
    }
  }

}

