import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, shareReplay } from 'rxjs/operators';
import {DateService} from "./date.service";
import {JwtResponse} from "../models/JwtResponse";
import {JwtRequest} from "../models/JwtRequest";
import {Router} from "@angular/router";


@Injectable({providedIn:'root'})
export class AuthenticationService {

  constructor(private http: HttpClient, private dateService: DateService, private router: Router) {
  }

  login(username: string, password: string): Observable<JwtResponse> {
    let jwtRequest: JwtRequest = {username: username, password: password};

    return this.http.post<JwtResponse>('http://localhost:8080/authenticate',
      jwtRequest).pipe(
      tap((resp: JwtResponse) => this.setSession(resp)),
      shareReplay()
    );
  }

  private setSession(authResult: JwtResponse) {
    const expiresAt = authResult.expirationDate;
    console.log("Token expires at " + expiresAt);
    console.log("Token date and time is " + this.dateService.getShortDateAndTimeDisplay(expiresAt));
    localStorage.setItem('id_token', authResult.token);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
  }

  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");

    this.router.navigate(["/"]);
  }

  public isLoggedIn(): boolean {
    let loggedIn: boolean = false;
    let expiration = this.getExpiration();

    if (expiration) {
      return Date.now() < expiration;
    }
    return loggedIn;
  }

  isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }

  private getExpiration(): number {
    let expiresAt: any = null;

    const expiration = localStorage.getItem("expires_at");

    if (expiration){
      expiresAt = JSON.parse(expiration)
    }
    return expiresAt;
  }

  token(): string {
    return <string>localStorage.getItem(`TOKEN_NAME`);
  }
}
