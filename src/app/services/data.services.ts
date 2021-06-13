import {BehaviorSubject} from "rxjs";
import {OrderLine} from "../models/orderLine";
import {Injectable} from "@angular/core";
import {Product} from "../models/product";


@Injectable({ providedIn: 'root' })
export class DataServices{

  private orderLinesSource = new BehaviorSubject<OrderLine[]>([]);
  currentOrderLines = this.orderLinesSource.asObservable();
  changeOrderLines(orderLines: OrderLine[]){
    this.orderLinesSource.next(orderLines);
  }

  private orderLinesStringSource = new BehaviorSubject<String[]>([]);
  currentOrderLinesString = this.orderLinesStringSource.asObservable();
  changeOrderLinesString(orderLinesString: String[]){
    this.orderLinesStringSource.next(orderLinesString);
  }

  private productsSource = new BehaviorSubject<Product[]>([]);
  currentProducts = this.productsSource.asObservable();
  changeProducts(products: Product[]){
    this.productsSource.next(products);
  }

  private productsStringSource = new BehaviorSubject<String[]>([]);
  currentProductsString= this.productsStringSource.asObservable();
  changeProductsString(productsString: String[]){
    this.productsStringSource.next(productsString);
  }

  constructor() {}

}
