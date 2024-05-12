// 1. Create a guard service
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsersFacade } from '../state/users/users.facade';
import { User } from '../auth/shared/User';
import { Observable, map, skip, skipWhile, take } from 'rxjs';
import { UsersState } from '../state/users/users.reducer';
import { LoadAuthenticatedUser } from '../state/users/users.actions';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private router: Router,private usersFacade: UsersFacade) {}

    canActivate(): Observable<boolean> {
        return this.usersFacade.authenticatedUser$.pipe(
            skipWhile(state => !state.authLoading),
            skipWhile(state => state.authLoading),
            map(authenticatedUser => {
                if (authenticatedUser.authenticatedUser && authenticatedUser.authenticatedUser.role == 'ADMIN') {
                    return true;
                }
                else {
                    this.usersFacade.loadAuthenticatedUser();
                    this.router.navigateByUrl('/')
                    return false;
                }
                })
        );
    }
}