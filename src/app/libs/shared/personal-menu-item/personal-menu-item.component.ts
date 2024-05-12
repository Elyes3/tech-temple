import { Component } from '@angular/core';
import { UsersFacade } from '../../state/users/users.facade';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-personal-menu-item',
  templateUrl: './personal-menu-item.component.html',
  styleUrls: ['./personal-menu-item.component.scss']
})
export class PersonalMenuItemComponent {
  constructor(private usersFacade: UsersFacade, private router: Router) { }
  authenticatedUser$ = this.usersFacade.authenticatedUser$;
  subscription!: Subscription;
  logout() {
    this.usersFacade.logoutAuthenticatedUser();
    this.subscription = this.usersFacade.authenticatedUser$.subscribe(authenticatedUser => {
      if (authenticatedUser.authenticatedUser == null) {
        console.log(authenticatedUser.authenticatedUser);
        this.router.navigateByUrl('/', { state: { logout: true } })
      }
    })
  }
}
