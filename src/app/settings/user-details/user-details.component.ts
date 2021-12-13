import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationService} from "../../auth/authentication.service";
import {Subscription} from "rxjs";
import {UserServices} from "../../services/user.services";
import {User} from "../../models/user";
import {FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {DatePipe} from "@angular/common";

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
              private userService: UserServices,
              private datePipe: DatePipe) {
  }

  ngOnInit(): void {

    this.userSub = this.authService.currentUser.subscribe(authUser => {
      this.currentUserId = <number>authUser?.userId;
    });
    this.userService.getUserById(<number>this.currentUserId)
      .subscribe((response: User) => {
        this.currentUser = response
        this.initEditProfileForm()
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
      password: new FormControl('************'),
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

    // Set date to dd-MM-yyyy so it can be understood by the spring backend
    let newDate = this.datePipe.transform(this.currentUser.creationDate, 'dd-MM-yyyy');
    this.currentUser.creationDate = <string>newDate;

    this.userService.updateUser(this.currentUser).subscribe(
      (response: User) => {
        this.currentUser = response;
        this.ngOnInit();
        alert('User Updated.');
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }
}
