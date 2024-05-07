// 1. Create a guard service
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UsersFacade } from '../state/users/users.facade';
import { User } from '../auth/shared/User';
import { Observable, map, skip, skipWhile, take } from 'rxjs';
import { UsersState } from '../state/users/users.reducer';
import { LoadAuthenticatedUser } from '../state/users/users.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthRedirectGuard implements CanActivate {

  constructor(private router: Router,private usersFacade: UsersFacade) {}

    canActivate(): Observable<boolean> {
        console.log("IN")
        this.usersFacade.loadAuthenticatedUser();
        return this.usersFacade.authenticatedUser$.pipe(
            skipWhile(state => !state.authLoading),
            skipWhile(state => state.authLoading),
            map(authenticatedUser => {
                
                if (!authenticatedUser.authenticatedUser) 
                    return true;
                else {
                    if (authenticatedUser.authenticatedUser.role == 'ADMIN') {
                        this.router.navigateByUrl('/admin/users');
                    }
                    else
                    {
                        this.router.navigateByUrl('/home');    
                    }
                    return false;
                }
                })
        );
    }
}