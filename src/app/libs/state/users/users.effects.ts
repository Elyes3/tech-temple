import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { User } from "../../auth/shared/User";
import { AddUser, DeleteUser, LoadUsers, UpdateUser, UserAdded, UserDeleted, UserUpdated, UsersActionTypes, UsersLoaded } from "./users.actions";
import { UsersService } from "../../dashboard/services/users.service";
// import { DataPersistence } from '@nrwl/nx';
// CHECK FOR NRWL IF IT DOESNT WORK
@Injectable()
export class UsersEffects {
    constructor(
        private actions$: Actions,
        private usersService: UsersService,
    ) { }
    loadUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UsersActionTypes.LoadUsers),
            switchMap((action: LoadUsers) =>
                this.usersService.loadUsers().pipe(
                    map((res: User[]) => new UsersLoaded(res)),
                    catchError(error => { console.log(error); return of(null) }))
            )
        )
    );
    addUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UsersActionTypes.AddUser),
            switchMap((action: AddUser) =>
                this.usersService.addUser(action.payload).pipe(
                    map((res: User) => new UserAdded(res)),
                    catchError(error => { console.log(error); return of(null) }))
            )
        )
    );
    updateUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UsersActionTypes.UpdateUser),
            switchMap((action: UpdateUser) =>
                this.usersService.updateUser(action.payload.id,action.payload).pipe(
                    map((res: User) => new UserUpdated(res)),
                    catchError(error => { console.log(error); return of(null) }))
            )
        )
    );
    deleteUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UsersActionTypes.DeleteUser),
            switchMap((action: DeleteUser) =>
                this.usersService.deleteUser(action.payload.id,action.payload).pipe(
                    map((res: User) => new UserDeleted(res)),
                    catchError(error => { console.log(error); return of(null) }))
            )
        )
    );
}