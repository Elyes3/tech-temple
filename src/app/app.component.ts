import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersFacade } from './libs/state/users/users.facade';
import { Role } from './libs/auth/shared/Role';
import { map, skip, skipWhile } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'tech-temple';
  constructor(private router : Router,private usersFacade : UsersFacade) {}
  authenticatedUser$ = this.usersFacade.authenticatedUser$;
  authenticatedRoutes() {
    return this.router.url !== '/'
      && this.router.url !== '/register'
      && this.router.url !== '/reset-password'
      && this.router.url !== '/admin/users'
      && this.router.url !== '/admin/categories'
      && this.router.url !== '/admin/products'
      && this.router.url !== '/admin/orders'
  }
}
