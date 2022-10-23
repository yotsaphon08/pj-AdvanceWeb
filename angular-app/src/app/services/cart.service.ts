import { Injectable } from '@angular/core';
import { menuModel } from '../models/menu';
import { MenuService } from './menu.service';

@Injectable({providedIn: 'root'})

export class CartService {
 
  counter: number = 0;
  sumPrice: number = 0;
  cart: menuModel = [];

  constructor(private menuService: MenuService) { }


add(id: number){
  console.log('Add product id:'+id+' to cart');
  this.cart.push(this.menuService.getSomeMenu(id))
  this.sumPrice += this.menuService.getSomeMenu(id).price
  this.counter = this.cart.length;

}
getCounter(){
  return this.counter;
}

getSumPrice(){
  return this.sumPrice}

getCart(){
  return this.cart;
}
}