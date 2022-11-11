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
  status?: any;
  // menuComponent !: MenuComponent
  constructor(private router: Router, private menu: MenuService) {}

  ngOnInit(): void {
    this.onLoading();
  }

  deleteMenu(item: any) {
    alert('Remove Menu Successfully..');
    this.menu.deleteMenu(item);
  }

  onClick() {
    this.router.navigate(['/addmenu']);
  }
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

  onRowClick(row: any) {
    console.log(row.MID);
    this.status = row.MID;
  }
}
