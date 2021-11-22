import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../models/user";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn:'root'
})

export class UserServices{
  private apiServiceUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
  }
  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiServiceUrl}/user/all`);
  }

  public getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiServiceUrl}/user/find/${id}`);
  }

  public addUser(user: User): Observable<User>{
    return this.http.post<User>(`${this.apiServiceUrl}/user/add`, user);
  }

  public updateUser(user: User): Observable<User>{
    console.log('user creation date before put: ' + user.creationDate);
    console.log(user)
    return this.http.put<User>(`${this.apiServiceUrl}/user/update`, user);
  }

  public deleteUser(userId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServiceUrl}/user/delete/${userId}`);
  }

}
