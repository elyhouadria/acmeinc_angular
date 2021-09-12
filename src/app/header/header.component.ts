import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "../models/user";
import {UserServices} from "../services/user.services";
import {ProductService} from "../services/product.service";
import {OrderlineService} from "../services/orderline.service";
import {AuthenticationService} from "../auth/authentication.service";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuthenticated = false;
  private userSub!: Subscription;
  userName: string | undefined;



  constructor(private userServices: UserServices,
              private productServices: ProductService,
              private orderLineServices: OrderlineService,
              private authenticationService: AuthenticationService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.userSub = this.authenticationService.currentUser.subscribe(authUser => {
      this.isAuthenticated = !!authUser;
      this.userName = authUser?.userFirstName + ' ' + authUser?.userLastName;
    });
  }

  ngOnDestroy() {
    this.userSub!.unsubscribe()
  }

  public onOpenModal(user: User | null, mode: string): void {
    const container = document.getElementById('mainNavBar')
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addUserModal');
    }
    container!.appendChild(button);
    button.click();
  }

  public searchProducts(keyword: string): void {
    this.router.navigate([`search/${keyword}`], {queryParamsHandling: 'preserve'})
  }

  public onLogout() {
    this.authenticationService.logout();
  }

}

