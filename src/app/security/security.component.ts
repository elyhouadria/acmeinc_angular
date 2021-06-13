/*
import { Component, OnInit } from '@angular/core';
import {JwtClientService} from "./jwt-client.service";
import {User} from "../models/user";

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css']
})
export class SecurityComponent implements OnInit {

  response: any;

/!*  authRequest: any = {
    "userName": this.userEmail,
    "password": this.password
  };*!/

  constructor(private service: JwtClientService) {}

  ngOnInit(): void {}

  public getAccessToken(authRequest: any){
    let resp = this.service.generateToken(authRequest);
    resp.subscribe(data=>this.accessApi(data));
  }

  public accessApi(token:any){
    let resp = this.service.welcome(token);
    resp.subscribe(data=> this.response=data);
    console.log("accessAPI response "+resp);
  }
}
*/
