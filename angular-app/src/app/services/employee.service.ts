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

}
