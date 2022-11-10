import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
// import { MenuComponent } from '../menu/menu.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css'],
})
export class ManageComponent implements OnInit {
  ListMenu: any;
 // menuComponent !: MenuComponent
  constructor(
    private router: Router,
    private menu: MenuService,
    
  ) {}

  ngOnInit(): void {}

  deleteMenu(id: number){


  }
  onClick() {
    this.router.navigate(['/addmenu']);
  }
  getMenu(){
   return this.menu.getMenu();
  }





}
