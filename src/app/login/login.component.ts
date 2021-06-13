import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {User} from "../models/user";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {JwtResponse} from "../models/JwtResponse";
import {UrlService} from "../services/url.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  formSubmitted: boolean = false;

  signedInUser!: User;

  constructor(private fb: FormBuilder, private authenticationService: AuthenticationService,
              private router: Router, private route: ActivatedRoute, private urlService: UrlService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      'username': ['', Validators.compose([Validators.required])],
      'password': ['', Validators.compose([Validators.required])]
    });
  }

  onSubmit(loginForm: any) {
    this.formSubmitted = true;

    if (this.form.valid) {
      let username = this.form.controls['username'].value;
      let password = this.form.controls['password'].value;

      let user$ = this.authenticationService.login(username, password);


      user$.subscribe(
        (jwtResponse: JwtResponse) => this.handleLoginResponse(jwtResponse),
        err => console.error(err)
      );
    } else {
      console.log("The form is NOT valid");
      this.formSubmitted = false;
    }
  }
  handleLoginResponse(jwtResponse: JwtResponse) {
    console.log(jwtResponse);

    if (jwtResponse && jwtResponse.token) {
      this.goToRoute();
    }

    this.formSubmitted = false;
  }

  private goToRoute() {
    let map: ParamMap = this.route.snapshot.queryParamMap;
    let returnUrl = map.get('returnUrl');
    let queryParams: any = {};

    if (returnUrl) {
      queryParams = this.urlService.getQueryParams(returnUrl);
      returnUrl = this.urlService.shortenUrlIfNecessary(returnUrl);
    } else {
      returnUrl = '/dashboard';
    }

    this.router.navigate([returnUrl], queryParams);
  }
}
