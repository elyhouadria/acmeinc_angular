import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Category} from "../models/category";
import {BehaviorSubject, Observable} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiServiceUrl = environment.apiBaseUrl;
  selectedCategorySub = new BehaviorSubject<Category | null>(null);

  constructor(private http: HttpClient) {
  }

  public setSelectedCategory(category: Category): Category {
    this.selectedCategorySub.next(category);
    return category;
  }


  public getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiServiceUrl}/category/all`);
  }

  public getCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.apiServiceUrl}/category/find/${id}`);
  }

  public addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(`${this.apiServiceUrl}/category/add`, category);
  }

  public updateCategory(category: Category): Observable<Category>{
    return this.http.put<Category>(`${this.apiServiceUrl}/category/update`, category);
  }

  public deleteCategory(categoryId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServiceUrl}/category/delete`)
  }
}
