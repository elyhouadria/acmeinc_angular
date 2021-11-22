import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../auth/authentication.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {JwtResponse} from "../models/JwtResponse";
import {UrlService} from "../services/url.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {
  form!: FormGroup;
  formSubmitted: boolean = false;
  errorMessage?: string;

  constructor(private fb: FormBuilder, private authenticationService: AuthenticationService,
              private router: Router, private route: ActivatedRoute, private urlService: UrlService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      'username': ['', Validators.email],
      'password': ['']
    });
  }

  // Send authentication request to backend to identify user
  onSubmit(loginForm: any) {
    this.formSubmitted = true;

    if (this.form.valid) {
      let username = this.form.controls['username'].value;
      let password = this.form.controls['password'].value;

      let user$ = this.authenticationService.login(username, password);
      user$.subscribe(
        (jwtResponse: JwtResponse) => this.handleLoginResponse(jwtResponse),
        (err: Error) => {
          this.errorMessage = err.message;
        }
      );
    } else {
      console.log("The form is NOT valid");
      this.formSubmitted = false;
    }
  }

  // Check presence of token in response
  handleLoginResponse(jwtResponse: JwtResponse) {
    console.log(jwtResponse);
    if (jwtResponse && jwtResponse.token) {
      this.goToRoute();
    }
    this.formSubmitted = false;
  }
  // redirect user after authentication
  private goToRoute() {
    let map: ParamMap = this.route.snapshot.queryParamMap;
    let returnUrl = map.get('returnUrl');
    let queryParams: any = {};

    if (returnUrl) {
      queryParams = this.urlService.getQueryParams(returnUrl);
      returnUrl = this.urlService.shortenUrlIfNecessary(returnUrl);
    } else {
      returnUrl = '/home';
    }
    this.router.navigate([returnUrl], queryParams);
  }
}
