import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
// import { MenuComponent } from '../menu/menu.component';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

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

  UpdateMenuID(id: any) {
    try {
      this.menu
        .UpdateMenuID(id)
        .pipe(first())
        .subscribe(
          (data) => {
            console.log(data);
            alert('Update Menu Successfully..');
            location.reload();
          },
          (err) => {
            console.log(err);
            alert('Update Menu fail!');
          }
        );
    } catch (err) {
      console.log(err);
    }
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
