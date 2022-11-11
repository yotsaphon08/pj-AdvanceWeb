import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MainComponent } from './components/main/main.component';
import { MenuComponent } from './components/menu/menu.component';
import { HomeComponent } from './components/home/home.component';

import { AuthInterceptor } from './Auth/auth.interceptor';
import { AddmenuComponent } from './components/addmenu/addmenu.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { ShowDetailsComponent } from './components/show-details/show-details.component';
import { CartComponent } from './components/cart/cart.component';
import { ManageComponent } from './components/manage/manage.component';
import { OrderComponent } from './components/order/order.component';
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, NavbarComponent, MainComponent, MenuComponent, HomeComponent, AddmenuComponent, EmployeeComponent, ShowDetailsComponent, CartComponent, ManageComponent, OrderComponent, ProfileComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },],
  bootstrap: [AppComponent],
})
export class AppModule {}
