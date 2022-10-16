import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { employee } from 'src/app/models/employee';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  //status = localStorage.getItem('token') ?? false;
  currentUser?: employee;
  name= localStorage.getItem('currentUser');
  n?: string;
  constructor(private router: Router, private login: LoginService) {
    this.login.currentUser.subscribe(x => this.currentUser = x);
    this.n =  this.name?.split("name\":\"")[1].split("email")[0].split("\",\"")[0];
  }

  ngOnInit(): void {}

  logout() {
    this.login.logout();
    this.router.navigate(['/login']);
    //location.reload();
  }
}
