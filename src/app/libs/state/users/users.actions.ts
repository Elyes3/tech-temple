import { Action } from "@ngrx/store";
import { User } from "../../auth/shared/User";
import { PaginationInfo } from "../../dashboard/shared/PaginationInfo";

export enum UsersActionTypes {
    LoadAuthenticatedUser = '[Users] Load Authenticated User',
    AuthenticatedUserLoaded = '[Users] Authenticated User Loaded',
    LoadUsersWithPaginationAndSort = '[Users] Load Users with Pagination and Sort',
    UsersWithPaginationAndSortLoaded = '[Users] Users with Pagination and Sort Loaded',
    AuthenticatedUserError = '[Users] Authenticated User Error',
    LoadUsers = '[Users] Load Users',
    UsersLoaded = '[Users] Users Loaded',
    AddUser = '[Users] Add User',
    UserAdded = '[Users] User Added',
    DeleteUser = '[Users] Delete User',
    UserDeleted = '[Users] User Deleted',
    UpdateUser = '[Users] Update User',
    UserUpdated = '[Users] User Updated',
}
export class LoadUsersWithPaginationAndSort implements Action{
    readonly type = UsersActionTypes.LoadUsersWithPaginationAndSort
    constructor(public payload : PaginationInfo){}
}
export class UsersWithPaginationAndSortLoaded implements Action{
    readonly type = UsersActionTypes.UsersWithPaginationAndSortLoaded
    constructor(public payload : User[]){}
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
export class AddUser implements Action{
    readonly type = UsersActionTypes.AddUser;
    constructor(public payload: User){ }
}
export class UserAdded implements Action{
    readonly type = UsersActionTypes.UserAdded;
    constructor(public payload: User){ }
}
export class UpdateUser implements Action{
    readonly type = UsersActionTypes.UpdateUser;
    constructor (public payload : User){ }
}
export class UserUpdated implements Action{
    readonly type = UsersActionTypes.UserUpdated;
    constructor (public payload : User){ }
}
export class DeleteUser implements Action{
    readonly type = UsersActionTypes.DeleteUser;
    constructor (public payload : User){ }
}
export class UserDeleted implements Action{
    readonly type = UsersActionTypes.UserDeleted;
    constructor (public payload : User){ }
}
export type UsersActions = LoadAuthenticatedUser
    | AuthenticatedUserLoaded
    | LoadUsersWithPaginationAndSort
    | UsersWithPaginationAndSortLoaded
    | AuthenticatedUserError
    | LoadUsers
    | UsersLoaded
    | AddUser
    | UserAdded
    | UpdateUser
    | UserUpdated
    | DeleteUser
    | UserDeleted
