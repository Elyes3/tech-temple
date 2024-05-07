import { Action } from "@ngrx/store";
import { User } from "../../auth/shared/User";
import { PaginationInfo } from "../../dashboard/shared/PaginationInfo";

export enum UsersActionTypes {
    LoadAuthenticatedUser = '[Users] Load Authenticated User',
    AuthenticatedUserLoaded = '[Users] Authenticated User Loaded',
    LoadUsersWithPaginationAndSort = '[Users] Load Users with Pagination and Sort',
    UsersWithPaginationAndSortLoaded = '[Users] Users with Pagination and Sort Loaded',
    LoadUsersWithPaginationAndSortError = '[Users] Load Users with Pagination and Sort Error',
    AuthenticatedUserError = '[Users] Authenticated User Error',
    LoadUsers = '[Users] Load Users',
    UsersLoaded = '[Users] Users Loaded',
    LoadUsersError = '[Users] Load Users Error',
    AddUser = '[Users] Add User',
    UserAdded = '[Users] User Added',
    AddUserError = '[Users] Add User Error',
    DeleteUser = '[Users] Delete User',
    UserDeleted = '[Users] User Deleted',
    DeleteUserError = '[Users] Delete User Error',
    UpdateUser = '[Users] Update User',
    UserUpdated = '[Users] User Updated',
    UpdateUserError = '[Users] Update User Error'
}
export class LoadUsersWithPaginationAndSort implements Action{
    readonly type = UsersActionTypes.LoadUsersWithPaginationAndSort
    constructor(public payload : PaginationInfo){}
}
export class UsersWithPaginationAndSortLoaded implements Action{
    readonly type = UsersActionTypes.UsersWithPaginationAndSortLoaded
    constructor(public payload : User[]){}
}
export class LoadUsersWithPaginationAndSortError implements Action{
    readonly type = UsersActionTypes.LoadUsersWithPaginationAndSortError
    constructor(){}
}
export class LoadAuthenticatedUser implements Action{
    readonly type = UsersActionTypes.LoadAuthenticatedUser;
    constructor() { }
}
export class AuthenticatedUserLoaded implements Action{
    readonly type = UsersActionTypes.AuthenticatedUserLoaded;
    constructor(public payload: User){ }
}
export class AuthenticatedUserError implements Action{
    readonly type = UsersActionTypes.AuthenticatedUserError;
    constructor (){}
}
export class LoadUsers implements Action{
    readonly type = UsersActionTypes.LoadUsers;
    constructor() { }
}
export class UsersLoaded implements Action{
    readonly type = UsersActionTypes.UsersLoaded;
    constructor(public payload: User[]){ }
}
export class LoadUsersError implements Action{
    readonly type = UsersActionTypes.LoadUsersError
    constructor() {}
}
export class AddUser implements Action{
    readonly type = UsersActionTypes.AddUser;
    constructor(public payload: User){ }
}
export class UserAdded implements Action{
    readonly type = UsersActionTypes.UserAdded;
    constructor(public payload: User){ }
}
export class AddUserError implements Action{
    readonly type = UsersActionTypes.AddUserError
    constructor(){}
}
export class UpdateUser implements Action{
    readonly type = UsersActionTypes.UpdateUser;
    constructor (public payload : User){ }
}
export class UserUpdated implements Action{
    readonly type = UsersActionTypes.UserUpdated;
    constructor (public payload : User){ }
}
export class UpdateUserError implements Action{
    readonly type = UsersActionTypes.UpdateUserError;
    constructor (){}
}
export class DeleteUser implements Action{
    readonly type = UsersActionTypes.DeleteUser;
    constructor (public payload : User){ }
}
export class UserDeleted implements Action{
    readonly type = UsersActionTypes.UserDeleted;
    constructor (public payload : User){ }
}
export class DeleteUserError implements Action{
    readonly type = UsersActionTypes.DeleteUserError;
    constructor (){ }
}
export type UsersActions = LoadAuthenticatedUser
    | AuthenticatedUserLoaded
    | LoadUsersWithPaginationAndSort
    | UsersWithPaginationAndSortLoaded
    | LoadUsersWithPaginationAndSortError
    | AuthenticatedUserError
    | LoadUsers
    | UsersLoaded
    | LoadUsersError
    | AddUser
    | UserAdded
    | AddUserError
    | UpdateUser
    | UserUpdated
    | UpdateUserError
    | DeleteUser
    | UserDeleted
    | DeleteUserError
