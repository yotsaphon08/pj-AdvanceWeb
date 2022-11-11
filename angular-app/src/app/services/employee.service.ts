import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { employee, empModel } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) {}

  employees: any;
  employee?: empModel[];

  emp?: employee;

  getEmployee() {
    return this.http.get<employee>('http://localhost:3000/api/employee').pipe(
      map((data) => {
        if (data) {
          this.employees = data;
          console.log(this.employees);
        }
        return this.employees;
      })
    );
  }

  getEmployeeID(tid?: string) {
    return this.http
      .get<employee>('http://localhost:3000/api/employee/' + tid)
      .pipe(
        map((data) => {
          if (data) {
            this.emp = data;
            //console.log(this.employee);
          }
          return this.emp;
        })
      );
  }

  UpdateEmployeeID(tid?: string, d?: any) {
    return this.http
      .put<employee>('http://localhost:3000/api/employee/' + tid, d)
      .pipe(
        map((data) => {
          if (data) {
            console.log(data);
          }
          return data;
        })
      );
  }

}
