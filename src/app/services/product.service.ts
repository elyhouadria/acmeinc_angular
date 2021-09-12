import {environment} from "../../environments/environment";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../models/product";


@Injectable({
  providedIn: 'root'
})

export  class ProductService {
  private apiServiceUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}


  public productPaginationList(request: any) {
    const endpoint = environment.apiBaseUrl + "/productpagination";
    const params = request;
    return this.http.get(endpoint, { params })
  }


  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiServiceUrl}/product/all`);
  }

  public getProductByKeyword(keyword: String): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.apiServiceUrl}/product/search/${keyword}`)
  }

  public getProductsByCategoryId(id: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiServiceUrl}/product/findbycategory/${id}`);
  }

  public getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiServiceUrl}/product/find/${id}`);
  }

  public addProduct(product: Product): Observable<Product>{
    return this.http.post<Product>(`${this.apiServiceUrl}/product/add`, product);
  }

  public updateProduct(product: Product): Observable<Product>{
    return this.http.put<Product>(`${this.apiServiceUrl}/product/update`, product);
  }

  public deleteProduct(productId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServiceUrl}/product/delete`)
  }
}
