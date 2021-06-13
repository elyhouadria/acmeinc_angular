import {Component, OnInit} from '@angular/core';
import {UserServices} from "./services/user.services";
import {NgForm} from "@angular/forms";
import {User} from "./models/user";
import {HttpErrorResponse} from "@angular/common/http";
import {AuthenticationService} from "./services/authentication.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit() {
  }

/*  constructor(private authenticationService: AuthenticationService) {
    let user$ = authenticationService.login("elyh@ymail.com", "password");

    user$.subscribe(
      (data: any) => console.log(data),
      err => console.error(err)
    );

  }*/
}
