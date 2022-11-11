import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  id = localStorage.getItem('currentUser');
  employee: any;

  uid = localStorage.getItem('currentUser')?.split('id":"')[1].split('","')[0];

  employeeEditForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
    EmpID: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    tel: new FormControl('', [Validators.required]),
  });

  constructor(private em: EmployeeService) {
    const id = this.id?.split('id":"')[1].split('","')[0];
    //console.log(tid);

    this.getEmployeeID(id);
  }

  ngOnInit(): void {}

  submit() {
    const e = JSON.parse(JSON.stringify(this.employeeEditForm.value));
    console.log(e, this.uid);
    if (this.employeeEditForm.invalid) {
      console.log(this.employeeEditForm.invalid);
      return;
    }

    try {
      this.em
        .UpdateEmployeeID(this.uid, e)
        .pipe(first())
        .subscribe(
          (data) => {
            console.log(data);
            alert('Edit Successfully!');
            location.reload();
          },
          (err) => {
            console.log(err);
            alert('Edit fail!');
          }
        );
    } catch (err) {
      console.log(err);
    }
  }

  getEmployeeID(tid?: string) {
    try {
      this.em.getEmployeeID(tid).subscribe(
        (data) => {
          this.employee = data;
          this.employeeEditForm.patchValue({
            id: data?._id,
            EmpID: data?.EmpID,
            name: data?.name,
            gender: data?.gender,
            email: data?.email,
            tel: data?.tel,
          });
        },
        (err) => {
          console.log(err);
        }
      );
    } catch (err) {
      console.log(err);
    }
  }
}
