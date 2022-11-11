import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { login } from 'src/app/models/login';
import { CartService } from 'src/app/services/cart.service';
import { menuModel } from 'src/app/models/menu';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  //status = localStorage.getItem('token') ?? false;
  currentUser?: login;

  uid = localStorage.getItem('currentUser')?.split('id":"')[1].split('","')[0];
  cart: menuModel = [];
  n?: string;
  constructor(
    private router: Router,
    private login: LoginService,
    private cartService: CartService,
    private em: EmployeeService
  ) {
    this.login.currentUser.subscribe((x) => (this.currentUser = x));

    this.cart = this.cartService.getCart();
    this.getEmployeeID(this.uid);
  }

  ngOnInit(): void {}

  getEmployeeID(tid?: string) {
    try {
      this.em.getEmployeeID(tid).subscribe(
        (data) => {
          this.n = data?.name;
          console.log(this.n);
        },
        (err) => {
          console.log(err);
        }
      );
    } catch (err) {
      console.log(err);
    }
  }

  logout() {
    this.login.logout();
    this.router.navigate(['/login']);
    //location.reload();
  }

  getCounter() {
    return this.cartService.getCounter();
  }

  getSumPrice() {
    return this.cartService.getSumPrice();
  }
}
