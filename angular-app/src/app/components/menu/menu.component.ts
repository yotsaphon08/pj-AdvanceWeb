import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  ListMenu: any;
  Category = ['All', 'Coffee', 'Tea', 'Milk'];
  constructor(
    private menu: MenuService,
    private router: Router,
    private cartService: CartService
  ) {
    this.onLoading();
  }

  c = new FormControl('', [Validators.required]);
  check = 'A';

  ngOnInit(): void {}

  onLoading() {
    try {
      this.menu.getMenu().subscribe(
        (data) => {
          this.ListMenu = data;
        },
        (err) => {
          console.log(err);
        }
      );
    } catch (err) {
      console.log(err);
    }
  }

  onCheck() {
    if (this.c.value == '' || this.c.value == 'All') {
      this.check = 'A';
    } else {
      this.check = 'B';
    }
    return this.check;
  }

  onClick() {
    this.router.navigate(['/addmenu']);
  }

  addToCart(id: number) {
    this.menu.getSomeMenu(id).quantity -= 1;
    this.cartService.add(id);
  }
  parentData!: number;
  onClickViewMenu(){
    this.parentData += 1;

  }
}
