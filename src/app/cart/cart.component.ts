import { Component, OnInit } from '@angular/core';
import {OrderLine} from "../models/orderLine";
import {OrderlineServices} from "../services/orderline.services";
import {DataServices} from "../services/data.services";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public orderLines!: OrderLine[];
  public orderLinesStrings!: String[];

  constructor(private orderLineServices: OrderlineServices,
              private data: DataServices) {}


  ngOnInit(): void {
    this.data.currentOrderLines.subscribe(orderLines =>this.orderLines = orderLines);
    this.data.currentOrderLinesString.subscribe(orderLinesString => this.orderLinesStrings = orderLinesString);
    console.log("Synced in cart: "+ this.orderLines);
  }

  players = [
    "Sachin Tendulkar",
    "Ricky Ponting",
    "Virat Kohli",
    "Kumar Sangakkara",
    "Jacques Kallis",
    "Hashim Amla    ",
    "Mahela Jayawardene    ",
    "Brian Lara",
    "Rahul Dravid",
    "AB de Villiers"
  ]
  selected = "----";

  update(e:any){
    this.selected = e.target.value
  }




}
