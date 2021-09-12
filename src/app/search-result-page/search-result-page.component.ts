import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Product} from "../models/product";
import {ProductService} from "../services/product.service";

@Component({
  selector: 'app-search-result-page',
  templateUrl: './search-result-page.component.html',
  styleUrls: ['./search-result-page.component.css']
})
export class SearchResultPageComponent implements OnInit, OnDestroy {

  routeParamSub!: Subscription
  searchResultList: Product[] = []
  keyword!: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private productService: ProductService) {
  }

  ngOnInit(): void {
    this.routeParamSub = this.route.params
      .subscribe((params: Params) => {
        if (!params) {
          return;
        }
        else {
          this.keyword = <string>params['keyword']
          this.productService.getProductByKeyword(params['keyword']).subscribe((products: Product[]) => {
            this.searchResultList = products;
          });
        }
      });
  }

  ngOnDestroy() {
    this.routeParamSub.unsubscribe();
  }

}
