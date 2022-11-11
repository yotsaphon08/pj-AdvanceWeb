import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { menu, menuModel } from '../models/menu';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  constructor(private http: HttpClient) {}

  menus: any;
  menu?: menuModel[];
  submitStatus = false;

  getMenu() {
    return this.http.get<menu>('http://localhost:3000/api/menu').pipe(
      map((data) => {
        if (data) {
          this.menus = data;
          console.log(this.menus);
        }
        return this.menus;
      })
    );
  }

  getSomeMenu(id: number) {
    return this.menus[id];
  }

  addMenu(data: any) {
    return this.http
      .post<any>('http://localhost:3000/api/addmenu', data)
      .pipe(
        map((data) => {
          return data;
        })
      )
      .subscribe({
        next: (data) => {
          console.log(data);
          this.submitStatus = true;
        },
        error: (error) => {
          console.error('There was an error!', error);
          this.submitStatus = false;
        },
      });
  }
}
