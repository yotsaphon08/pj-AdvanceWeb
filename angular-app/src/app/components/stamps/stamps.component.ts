import { Component, OnInit } from '@angular/core';
import { StampsService } from '../../services/stamps.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-stamps',
  templateUrl: './stamps.component.html',
  styleUrls: ['./stamps.component.css'],
})
export class StampsComponent implements OnInit {
  s: any;

  stampsForm = new FormGroup({
    //id: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    tel: new FormControl('', [Validators.required]),
  });

  t = new FormControl('', [Validators.required]);

  constructor(private stamp: StampsService, private router: Router) {
    this.onLoading();
  }

  ngOnInit(): void {}

  onLoading() {
    try {
      this.stamp.getStamps().subscribe(
        (data) => {
          this.s = data;
        },
        (err) => {
          console.log(err);
        }
      );
    } catch (err) {
      console.log(err);
    }
  }

  getStamps() {
    try {
      this.stamp.getStamps().subscribe(
        (data) => {
          this.s = data;
        },
        (err) => {
          console.log(err);
        }
      );
    } catch (err) {
      console.log(err);
    }
  }

  onUpdateStamps() {
    const e = JSON.parse(JSON.stringify(this.t.value));
    if (this.t.invalid) {
      console.log(this.t.invalid);
      return;
    }

    try {
      this.stamp
        .onUpdateStamps(e, { points: 1 })
        .pipe(first())
        .subscribe(
          (data) => {
            const e = JSON.parse(JSON.stringify(data));
            //console.log(e.modifiedCount);
            if (e.modifiedCount === 0) {
              console.log('Collect Stamps fail!');
              alert('Tel do not match');
            } else {
              console.log(data);
              alert('Collect Stamps Successfully!');
              location.reload();
            }
          },
          (err) => {
            console.log(err);
            alert('Collect Stamps fail!');
          }
        );
    } catch (err) {
      console.log(err);
    }
  }

  deleteStamps(id: any) {
    alert('Remove Menu Successfully..');
    this.stamp.deleteStamps(id);
    location.reload();
  }

  submit() {
    const e = JSON.parse(JSON.stringify(this.stampsForm.value));
    if (this.stampsForm.invalid) {
      console.log(this.stampsForm.invalid);
      return;
    }

    try {
      this.stamp.addStamps(e);

      alert('Create Stamps Successfully!');
      location.reload();
    } catch (err) {
      alert('Create Stamps Fail!');
      console.log(err);
    }
  }
}
