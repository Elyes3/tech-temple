import { Injectable } from '@angular/core';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import * as UsersActions from './users.actions';
import { UsersState } from './users.reducer';
import { User } from '../../auth/shared/User';
import { UsersActionTypes } from './users.actions';
import { selectAllUsers, selectAuthenticatedUser, selectDataLoading } from '..';
import { PaginationInfo } from '../../dashboard/shared/PaginationInfo';
@Injectable({
  providedIn: 'root'
})
export class UsersFacade {
  allUsers$ = this.store.pipe(select(selectAllUsers));
  isDataLoading$ = this.store.pipe(select(selectDataLoading))
  authenticatedUser$ = this.store.pipe(select(selectAuthenticatedUser))
  mutations$ = this.actions$
    .pipe(
      filter(action =>
        action.type === UsersActionTypes.AddUser
        || action.type === UsersActionTypes.UpdateUser
        || action.type === UsersActionTypes.DeleteUser

      )
    );

  constructor(private store: Store<UsersState>, private actions$: ActionsSubject) {}

  loadAuthenticatedUser() {
    this.store.dispatch(new UsersActions.LoadAuthenticatedUser());
  }

  loadUsers() {
    this.store.dispatch(new UsersActions.LoadUsers());
  }
  logoutAuthenticatedUser() {
    this.store.dispatch(new UsersActions.LogoutAuthenticatedUser());
  }
  loadUsersWithPaginationAndSort(paginationInfo: PaginationInfo) {
    this.store.dispatch(new UsersActions.LoadUsersWithPaginationAndSort(paginationInfo))
  }
  addUser(user : User) {
    this.store.dispatch(new UsersActions.AddUser(user));
  }

  updateUser(user : User) {
    this.store.dispatch(new UsersActions.UpdateUser(user));
  }

  deleteUser(user : User) {
    this.store.dispatch(new UsersActions.DeleteUser(user));
  }
  
}