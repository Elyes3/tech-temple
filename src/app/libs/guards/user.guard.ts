// 1. Create a guard service
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UsersFacade } from '../state/users/users.facade';
import { User } from '../auth/shared/User';
import { Observable, Subscription, map, of, skip, skipWhile, take } from 'rxjs';
import { UsersState } from '../state/users/users.reducer';
import { LoadAuthenticatedUser } from '../state/users/users.actions';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor(private router: Router,private usersFacade: UsersFacade) {}
    currentUser: User | null = null;
    canActivate(): Observable<boolean> {
        const subscription: Subscription = this.usersFacade.authenticatedUser$.subscribe(authenticatedUser => {
            this.currentUser = authenticatedUser.authenticatedUser;
        })
        subscription.unsubscribe();
        if (this.currentUser) {
                    if (this.currentUser.role == 'CLIENT') {

                        return of(true);
                    }
                    else {
                        this.router.navigate(['/admin/users']);
                        return of(false)
                    }
        }
        else
        {
            return this.usersFacade.authenticatedUser$.pipe(
                skipWhile(state => !state.authLoading),
                skipWhile(state => state.authLoading),
                map(authenticatedUser => {
                    if (authenticatedUser.authenticatedUser && authenticatedUser.authenticatedUser.role == 'CLIENT') {

                        return true;
                    }
                    else if (authenticatedUser.authenticatedUser && authenticatedUser.authenticatedUser.role == 'ADMIN') {
                        this.router.navigate(['/admin/users']);
                        return false;
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
}