import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { orderModel } from 'src/app/models/order';
import {CartService} from 'src/app/services/cart.service'
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private cart: CartService,private order: OrderService) { }
 
  money!: number;
  sum = 0;
  data: orderModel = []
  ngOnInit(): void {
  }

  getCart(){
    return this.cart.getCart();
  }
  
  getSumPrice(){
    return this.cart.getSumPrice()
  }

  getCounter(){
    return this.cart.getCounter();
  }

  onSubmit(money:number){
     let change = 0;
     alert("Success")

     

     this.data.push({
      menuordering: this.cart.getCartid(),
      sumprice: this.cart.getSumPrice(),
      time: new Date()})
      console.log(this.data)

    var jsonObject: any = JSON.parse(JSON.stringify(this.data));
    console.log(jsonObject);

      this.order.addOrder(jsonObject);
      this.order.submitStatus = true;


    return change = money - this.cart.getSumPrice();
  }
 

}
