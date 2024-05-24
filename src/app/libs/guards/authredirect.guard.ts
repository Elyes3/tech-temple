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
export class AuthRedirectGuard implements CanActivate {

  constructor(private router: Router,private usersFacade: UsersFacade) {}
    currentUser: User | null = null;
    isUserCalled: boolean = false;
    canActivate(): Observable<boolean> {
        
            if (this.router.getCurrentNavigation()?.extras?.state && this.router.getCurrentNavigation()?.extras?.state?.logout) {
                return of(true)
            }
                    const subscription: Subscription = this.usersFacade.authenticatedUser$.subscribe(authenticatedUser => {
                        this.currentUser = authenticatedUser.authenticatedUser;
                        this.isUserCalled = authenticatedUser.isUserCalled;
                    })
        if (this.currentUser == null && this.isUserCalled) {
            return of(true);
            }
        subscription.unsubscribe();
            return this.usersFacade.authenticatedUser$.pipe(
                skipWhile(state => !state.authLoading),
                skipWhile(state => state.authLoading),
                map(authenticatedUser => {
                    console.log("SOMEHOW GOT HERE")
                    if (!authenticatedUser.authenticatedUser)
                        return true;
                    else {
                        this.currentUser = authenticatedUser.authenticatedUser;
                        if (authenticatedUser.authenticatedUser.role == 'ADMIN') {
                            this.router.navigateByUrl('/admin/users')
                            return false;
                        }
                        else {
                            this.router.navigateByUrl('/home');
                        }
                        return false;
                    }
                })
            );
    }
}