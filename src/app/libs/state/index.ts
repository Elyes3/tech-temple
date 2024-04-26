import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUsers from './users/users.reducer';
export interface AppState{
    users: fromUsers.UsersState
}
export const reducers: ActionReducerMap<AppState,any> = {
    users: fromUsers.usersReducer

};
export const selectUsersState = createFeatureSelector<fromUsers.UsersState>('users');

export const selectUserIds = createSelector(
    selectUsersState,
    fromUsers.selectUserIds
)
export const selectUserEntities = createSelector(
    selectUsersState,
    fromUsers.selectUserEntities
)
export const selectAllUsers = createSelector(
    selectUsersState,
    fromUsers.selectAllUsers
)
export const selectUsersTotal = createSelector(
    selectUsersState,
    fromUsers.selectUsersTotal
)
export const selectAuthenticatedUser = createSelector(
    selectUsersState,
    fromUsers.getAuthenticatedUser
)