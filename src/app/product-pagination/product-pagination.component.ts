import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {ProductPaginationDataSource} from "../services/product-pagination-data.source";
import {ProductService} from "../services/product.service";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-product-pagination',
  templateUrl: './product-pagination.component.html',
  styleUrls: ['./product-pagination.component.css']
})
export class ProductPaginationComponent implements OnInit, AfterViewInit, OnDestroy {

  public productPaginationDataSource!: ProductPaginationDataSource
  displayedColumns = ['id', 'product name', 'product description'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productPaginationDataSource = new ProductPaginationDataSource(this.productService)
    this.productPaginationDataSource.loadProductPagination();
  }

  ngAfterViewInit(): void {
    this.productPaginationDataSource.counter$
      .pipe(tap((count) => {
        this.paginator.length = count;
      })
      )
      .subscribe();
    this.paginator.page
      .pipe(tap(() => this.loadProductPagination())
      )
      .subscribe();
  }

  loadProductPagination() {
    this.productPaginationDataSource.loadProductPagination(this.paginator.pageIndex, this.paginator.pageSize);
  }

  ngOnDestroy(): void {

  }
}
