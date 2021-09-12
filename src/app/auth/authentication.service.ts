import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { tap, shareReplay } from 'rxjs/operators';
import {DateService} from "../services/date.service";
import {JwtResponse} from "../models/JwtResponse";
import {JwtRequest} from "../models/JwtRequest";
import {Router} from "@angular/router";
import {AuthUser} from "./authUser";


@Injectable({
  providedIn:'root'
})
export class AuthenticationService {

  currentUser = new BehaviorSubject<AuthUser | null>(null);
  private tokenExpirationTimer: any;

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
    const authUser = new AuthUser(authResult.user.id, authResult.user.lastName, authResult.user.firstName, authResult.user.email, authResult.token, new Date(expiresAt));
    //Set user after authentication
    this.currentUser.next(authUser);
    //Set user info in local storage
    localStorage.setItem('userId', String(authResult.user.id));
    localStorage.setItem('userLastName', authResult.user.lastName);
    localStorage.setItem('userFirstName', authResult.user.firstName);
    localStorage.setItem('userEmail', authResult.user.email);
    localStorage.setItem('id_token', authResult.token);
    localStorage.setItem('expires_at', String(expiresAt));
  }

  logout() {
    //Delete user info in local storage
    localStorage.removeItem("userId");
    localStorage.removeItem("userFirstName");
    localStorage.removeItem("userLastName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    //Remove Authenticated User info
    this.currentUser.next(null);
    this.router.navigate(["/home"]);
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
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
    const expiration = localStorage.getItem('expires_at');
    if (expiration){
      expiresAt = JSON.parse(expiration)
    }
    return expiresAt;
  }

  token(): string {
    return <string>localStorage.getItem('id_token');
  }

  autologin() {
    // identify user from local storage based on date of token
    let userId: string | null = localStorage.getItem('userId');
    let userLastName: string | null = localStorage.getItem('userLastName');
    let userFirstName: string | null = localStorage.getItem('userFirstName');
    let userEmail: string | null = localStorage.getItem('userEmail');
    let id_token: string | null = localStorage.getItem('id_token');
    let expires_at: string | null = localStorage.getItem('expires_at');

    if (!userId || !userLastName || !userFirstName || !userEmail || !id_token || !expires_at) {
      return
    }
    // convert date string to number
    const dateNumber = parseInt(expires_at);
    const loadedUser = new AuthUser(
      parseInt(userId),
      userLastName,
      userFirstName,
      userEmail,
      id_token,
      new Date(dateNumber)
    );
    if (loadedUser.token) {
      this.currentUser.next(loadedUser);
      //set autoLogout timer
      const expirationDuration = new Date(dateNumber).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }
}
