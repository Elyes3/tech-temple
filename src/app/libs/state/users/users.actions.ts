import { Action } from "@ngrx/store";
import { User } from "../../auth/shared/User";
export enum UsersActionTypes {
    UsersAction = '[Users] Action',
    LoadAuthenticatedUser = '[Users] Load Authenticated User',
    AuthenticatedUserLoaded = '[Users] Authenticated User Loaded',
    LoadUsers = '[Users] Load User',
    UsersLoaded = '[Users] Users Loaded',
    AddUser = '[Users] Add User',
    UserAdded = '[Users] User Added',
    DeleteUser = '[Users] Delete User',
    UserDeleted = '[Users] User Deleted',
    UpdateUser = '[Users] Update User',
    UserUpdated = '[Users] User Updated'
}
export class Users implements Action{
    readonly type = UsersActionTypes.UsersAction;
}
export class LoadAuthenticatedUser implements Action{
    readonly type = UsersActionTypes.LoadAuthenticatedUser;
    constructor() { }
}
export class AuthenticatedUserLoaded implements Action{
    // CHECK
    readonly type = UsersActionTypes.AuthenticatedUserLoaded;
    constructor(public payload: User){ }
}
export class LoadUsers implements Action{
    readonly type = UsersActionTypes.LoadUsers
    constructor() { }
}
export class UsersLoaded implements Action{
    readonly type = UsersActionTypes.UsersLoaded
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
export type UsersActions = Users
    | LoadAuthenticatedUser
    | AuthenticatedUserLoaded
    | LoadUsers
    | UsersLoaded
    | AddUser
    | UserAdded
    | UpdateUser
    | UserUpdated
    | DeleteUser
    | UserDeleted
    