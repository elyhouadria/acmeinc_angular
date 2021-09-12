import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "./auth/authentication.service";
import {HeaderComponent} from "./header/header.component";
import {ShoppingCartService} from "./services/shopping-cart.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService,
              private cartService: ShoppingCartService) {}

  ngOnInit() {
    this.authenticationService.autologin();
    this.cartService.checkLocalCart();
  }

}
