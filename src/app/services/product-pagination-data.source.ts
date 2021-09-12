import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {Product, ProductPagination} from "../models/product";
import {BehaviorSubject, Observable, of} from "rxjs";
import {ProductService} from "./product.service";
import {catchError, finalize} from "rxjs/operators";

export class ProductPaginationDataSource implements DataSource<Product>{

  private productPaginationSubject = new BehaviorSubject<Product[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private countSubject = new BehaviorSubject<number>(0);
  public counter$ = this.countSubject.asObservable();

  constructor(private productService: ProductService) {}

  connect(collectionViewer: CollectionViewer): Observable<Product[]> {
    return this.productPaginationSubject.asObservable()
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.productPaginationSubject.complete();
    this.loadingSubject.complete();
    this.countSubject.complete();
  }

  public loadProductPagination(pageNumber = 0, pageSize = 10){
    this.loadingSubject.next(true);
    this.productService.productPaginationList({page: pageNumber, size: pageSize})
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((productPagination: any) => {
        this.productPaginationSubject.next(productPagination.content);
        this.countSubject.next(productPagination.totalElements);
      });
  }



}
