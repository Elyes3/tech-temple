import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { User } from "../../auth/shared/User";
import { AddUser, AuthenticatedUserError, AuthenticatedUserLoaded, DeleteUser, LoadAuthenticatedUser, LoadUsers, LoadUsersWithPaginationAndSort, UpdateUser, UserAdded, UserDeleted, UserUpdated, UsersActionTypes, UsersLoaded, UsersWithPaginationAndSortLoaded } from "./users.actions";
import { UsersService } from "../../dashboard/services/users.service";
// import { DataPersistence } from '@nrwl/nx';
// CHECK FOR NRWL IF IT DOESNT WORK
@Injectable()
export class UsersEffects {
    constructor(
        private actions$: Actions,
        private usersService: UsersService,
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
)
            )
        )
    );
    deleteUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UsersActionTypes.DeleteUser),
            switchMap((action: DeleteUser) =>
                this.usersService.deleteUser(action.payload.id).pipe(
                    map((res: User) => new UserDeleted(res))),
            )
        )
    );
}