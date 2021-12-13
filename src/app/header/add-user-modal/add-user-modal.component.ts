import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {User} from "../../models/user";
import {HttpErrorResponse} from "@angular/common/http";
import {UserServices} from "../../services/user.services";
import {AuthenticationService} from "../../auth/authentication.service";

@Component({
  selector: 'app-add-user-modal',
  templateUrl: './add-user-modal.component.html',
  styleUrls: ['./add-user-modal.component.css']
})
export class AddUserModalComponent implements OnInit {
  addUserForm!: FormGroup;
  emailExists!: boolean;


  constructor(private userServices: UserServices,
              private authService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.initAddUserForm();
    this.emailExists = false;
    this.addUserForm.reset();

  }

  initAddUserForm() {
    this.addUserForm = new FormGroup({
      userFirstName: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z-àáâãäåçèéêëìíîïðòóôõöùúûüýÿ ]{2,26}$/)]),
      userLastName: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z-àáâãäåçèéêëìíîïðòóôõöùúûüýÿ ]{2,26}$/)]),
      loginUserEmail: new FormControl('', [
        Validators.required,
        Validators.email]),
      loginUserPassword: new FormControl('', [
        Validators.required,
        //At least six numbers including a number & capital letter, special characters are allowed
        Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,254}$/)])
    });
  }

  get userFirstName() {
    return this.addUserForm.get('userFirstName');
  }

  get userLastName() {
    return this.addUserForm.get('userLastName');
  }

  get loginUserEmail() {
    return this.addUserForm.get('loginUserEmail');
  }

  get loginUserPassword() {
    return this.addUserForm.get('loginUserPassword');
  }


  //Check if email is free, add user and authenticate him
  public onAddUser(): void {
    let newUser: User = <User>{
      firstName: <string>this.addUserForm.value['userFirstName'],
      lastName: <string>this.addUserForm.value['userLastName'],
      email: <string>this.addUserForm.value['loginUserEmail'],
      password: <string>this.addUserForm.value['loginUserPassword']
    }

    this.userServices.getUserByEmail(newUser.email).subscribe((response: User) => {
      if (!response) {
        this.userServices.addUser(newUser).subscribe(
          (response: User) => {
            console.log(response);
            this.ngOnInit()
            document.getElementById('closeCreateUserModal')!.click()
            this.authService.login(newUser.email, newUser.password).subscribe();
          },
          (error: HttpErrorResponse) => {
            alert(error.message);
            this.addUserForm.reset();
          }
        );
      }
      else{
        this.emailExists = true
      }
    })
  }
}


