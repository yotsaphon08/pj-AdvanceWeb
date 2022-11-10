import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  ListEmployee: any;
  constructor(private employee: EmployeeService, private router: Router) {  this.onLoading();}

  ngOnInit(): void {
  }
  onLoading() {
    try {
      this.employee.getEmployee().subscribe(
        (data) => {
          this.ListEmployee = data;
        },
        (err) => {
          console.log(err);
        }
      );
    } catch (err) {
      console.log(err);
    }
  }

  onClick() {
    this.router.navigate(['/menu']);
  }

}
