import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { stamps, stampsModel } from '../models/stamps';

@Injectable({
  providedIn: 'root',
})
export class StampsService {
  stamps: any;
  stamp?: stampsModel[];
  constructor(private http: HttpClient) {}

  getStamps() {
    return this.http.get<stamps>('http://localhost:3000/api/stamps').pipe(
      map((data) => {
        if (data) {
          this.stamps = data;
          console.log(this.stamps);
        }
        return this.stamps;
      })
    );
  }

  deleteStamps(id: any) {
    return this.http
      .delete('http://localhost:3000/api/stamps/' + id)
      .subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (error) => {
          console.error('There was an error!', error);
        },
      });
  }

  submitStatus = false;
  addStamps(data: any) {
    return this.http
      .post<any>('http://localhost:3000/api/stamps', data)
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

  onUpdateStamps(id: string, data: any) {
    return this.http
      .put('http://localhost:3000/api/stamps/' + id, data)
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
