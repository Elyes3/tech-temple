import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { User } from "../../auth/shared/User";
import { AddUser, AddUserError, AuthenticatedUserError, AuthenticatedUserLoaded, AuthenticatedUserLoggedOut, AuthenticatedUserLoggedOutError, DeleteUser, DeleteUserError, LoadAuthenticatedUser, LoadUsers, LoadUsersError, LoadUsersWithPaginationAndSort, LoadUsersWithPaginationAndSortError, UpdateUser, UpdateUserError, UserAdded, UserDeleted, UserUpdated, UsersActionTypes, UsersLoaded, UsersWithPaginationAndSortLoaded } from "./users.actions";
import { UsersService } from "../../dashboard/services/users.service";
import { AuthService } from "../../auth/services/auth.service";
// import { DataPersistence } from '@nrwl/nx';
// CHECK FOR NRWL IF IT DOESNT WORK
@Injectable()
export class UsersEffects {
    constructor(
        private actions$: Actions,
        private usersService: UsersService,
        private authService: AuthService
    ) { }
    loadAuthenticatedUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UsersActionTypes.LoadAuthenticatedUser),
            switchMap((action: LoadAuthenticatedUser) => this.usersService.loadAuthenticatedUser().pipe(
                map((res: User) => new AuthenticatedUserLoaded(res),
                ),
                catchError(error => of(new AuthenticatedUserError()))
            ),
            )))
    loadUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UsersActionTypes.LoadUsers),
            switchMap((action: LoadUsers) =>
                this.usersService.loadUsers().pipe(
                    map((res: User[]) => new UsersLoaded(res)),
                    catchError(error => of(new LoadUsersError()))
                )
            )
        )
    );
        loadUsersWithPaginationAndSort$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UsersActionTypes.LoadUsersWithPaginationAndSort),
            switchMap((action: LoadUsersWithPaginationAndSort) => {
                
                return this.usersService.loadUsersWithPaginationAndSort(action.payload).pipe(
                    map((res: User[]) => new UsersWithPaginationAndSortLoaded(res)),
                    catchError(error => of(new LoadUsersWithPaginationAndSortError()))
                )
            }
            )
        )
    );
    addUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UsersActionTypes.AddUser),
            switchMap((action: AddUser) =>
                this.usersService.addUser(action.payload).pipe(
                    map((res: User) => new UserAdded(res)),
                    catchError(error => of(new AddUserError()))
)
            )
        )
    );
    updateUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UsersActionTypes.UpdateUser),
            switchMap((action: UpdateUser) =>
                this.usersService.updateUser(action.payload.id,action.payload).pipe(
                    map((res: User) => new UserUpdated(res)),
                    catchError(error => of(new UpdateUserError()))
)
            )
        )
    );
    deleteUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UsersActionTypes.DeleteUser),
            switchMap((action: DeleteUser) =>
                this.usersService.deleteUser(action.payload.id).pipe(
                    map((res: User) => new UserDeleted(res)),
                    catchError(error => of(new DeleteUserError()))),
            )
        )
    );
    logoutAuthenticatedUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UsersActionTypes.LogoutAuthenticatedUser),
            switchMap((action: DeleteUser) =>
                this.authService.logout().pipe(
                    map(() => new AuthenticatedUserLoggedOut()),
                    catchError(error => of(new AuthenticatedUserLoggedOutError()))),
            )
        )
    );
}