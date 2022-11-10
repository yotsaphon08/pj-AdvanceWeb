import { Component, OnInit } from '@angular/core';
import {CartService} from 'src/app/services/cart.service'
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private cart: CartService) { }
  money!: number;
  sum = 0;
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
    return change = money - this.cart.getSumPrice();
  }
 

}
