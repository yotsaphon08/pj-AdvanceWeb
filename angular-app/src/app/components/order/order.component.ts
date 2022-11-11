import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  OrderList: any;
  constructor(private order: OrderService, private router: Router) { }

  ngOnInit(): void {
  }

  onLoading() {
    try {
      this.order.getOrder().subscribe(
        (data) => {
          this.OrderList = data;
        },
        (err) => {
          console.log(err);
        }
      );
    } catch (err) {
      console.log(err);
    }
  }

}
