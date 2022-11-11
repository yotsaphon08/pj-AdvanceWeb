import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';
import { MenuService } from 'src/app/services/menu.service';
import { menuModel } from 'src/app/models/menu';
import { range } from 'rxjs';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  OrderList: any;
  menus: menuModel = [];
  listorder: any;
  constructor(
    private order: OrderService,
    private router: Router,
    private menu: MenuService
  ) {
    this.onLoading();
    this.onLoading1();
  }

  ngOnInit(): void {}

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
  onLoading1() {
    try {
      this.menu.getMenu().subscribe(
        (data) => {
          this.listorder = data;
        },
        (err) => {
          console.log(err);
        }
      );
    } catch (err) {
      console.log(err);
    }
  }

  orderIDdata(mo: any) {
    console.log(this.listorder);
    for (let i = 0; i < mo.length; i++) {
      console.log(mo[i]);
      for (let j = 0; j < this.listorder.length; j++) {
        if (mo[i] === this.listorder[j]._id) {
          this.menus.push(this.listorder[j]);
        }
      }
    }
  }

  onD() {
    this.menus = [];
  }

  ondelete(id: any) {
    this.order.deleteOrder(id);
    alert("Delete Order Successfully!!")
    location.reload();
  }
}
