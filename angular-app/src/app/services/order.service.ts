import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { order, orderModel } from '../models/order';
import { menuModel } from '../models/menu';
import { MenuService } from './menu.service';

import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient,private cartService: CartService,private menuService: MenuService) {}

  orders: any;
  order?: orderModel[];
  
  submitStatus = false;

  


  getOrder() {
    return this.http.get<order>('http://localhost:3000/api/order').pipe(
      map((data) => {
        if (data) {
          this.orders = data;
          console.log(this.orders);
        }
        return this.orders;
      })
    );
  }

  addOrder(data: any) {
    return this.http.post<any>('http://localhost:3000/addorder/addorder', data).pipe(
      map((data) => {
        return data;
      })
    ).subscribe({
      next: data => {
          console.log(data)
          this.submitStatus = true;
      },
      error: error => {
          console.error('There was an error!', error);
          this.submitStatus = false;
      }
  });
  }

}
