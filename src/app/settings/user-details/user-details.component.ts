import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationService} from "../../auth/authentication.service";
import {Subscription} from "rxjs";
import {UserServices} from "../../services/user.services";
import {User} from "../../models/user";
import {FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit, OnDestroy {

  editProfileForm: FormGroup = <FormGroup>{};

  private userSub!: Subscription;
  private currentUserId!: number | undefined;
  currentUser!: User;


  constructor(private authService: AuthenticationService,
              private userService: UserServices) {
  }

  ngOnInit(): void {

    this.userSub = this.authService.currentUser.subscribe(authUser => {
      this.currentUserId = <number>authUser?.userId;
    });
    this.userService.getUserById(<number>this.currentUserId)
      .subscribe((response: User) => {
        this.currentUser = response
        this.initEditProfileForm()
        console.log('response: ' + response);
        console.log('currentUser: ' + this.currentUser);
      });
    this.initEditProfileForm()
  }

  initEditProfileForm() {
    this.editProfileForm = new FormGroup({
      id: new FormControl(this.currentUser?.id),
      firstName: new FormControl(this.currentUser?.firstName, [
        Validators.required,
        Validators.pattern(/^[a-zA-Zàáâãäåçèéêëìíîïðòóôõöùúûüýÿ ]{2,26}$/)
      ]),
      lastName: new FormControl(this.currentUser?.lastName, [
        Validators.required,
        Validators.pattern(/^[a-zA-Zàáâãäåçèéêëìíîïðòóôõöùúûüýÿ ]{2,26}$/)
      ]),
      email: new FormControl(this.currentUser?.email),
      //password: new FormControl(this.currentUser?.password),
      creationDate: new FormControl(this.currentUser?.creationDate),
      authorities: new FormControl(this.currentUser?.roles)
    })
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  get firstName(){
    return this.editProfileForm.get('firstName');
  }
  get lastName(){
    return this.editProfileForm.get('lastName');
  }

  onUpdateProfile() {
    this.currentUser.firstName = <string>this.editProfileForm.value['firstName'];
    this.currentUser.lastName = <string>this.editProfileForm.value['lastName'];
    //Works but I need to deal with date problem between angular and Mysql/Spring
    this.userService.updateUser(this.currentUser).subscribe(
      (response: User) => {
        this.currentUser = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }
}
