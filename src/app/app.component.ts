import {Component, OnInit} from '@angular/core';
import {UserServices} from "./services/user.services";
import {NgForm} from "@angular/forms";
import {User} from "./models/user";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  ngOnInit() {
  }

  constructor(private userServices: UserServices) {

  }

  public onAddUser(addUserForm: NgForm): void{
    document.getElementById('add-user-form')!.click();
    this.userServices.addUser(addUserForm.value).subscribe(
      (response: User)=>{
        console.log(response);
        addUserForm.reset();
      },
      (error: HttpErrorResponse)=>{
        alert(error.message);
        addUserForm.reset();
      }
    );
  }

  public onOpenModal(employee: User | null, mode: string): void{
    const container = document.getElementById('')
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display= 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode ==='add'){
      button.setAttribute('data-target', '#addEmployeeModal')
    }
    container!.appendChild(button);
    button.click();
}



}
