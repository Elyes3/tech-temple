import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { User } from '../../auth/shared/User';
import { UsersActions, UsersActionTypes } from './users.actions';
export interface UsersState extends EntityState<User>{
    authenticatedUser: User | null;
    authLoading: boolean,
    dataLoading: boolean,
    isUserCalled: boolean
}
export const adapter: EntityAdapter<User> = createEntityAdapter<User>();
export const initialState: UsersState = adapter.getInitialState({
    authenticatedUser: null,
    authLoading: false,
    dataLoading: false,
    isUserCalled: false,
})
export function usersReducer(state : UsersState = initialState, action: UsersActions): UsersState {
    switch (action.type) {
        case UsersActionTypes.AuthenticatedUserLoaded: {
            return Object.assign({}, state, {
                authenticatedUser: {
                    id: action.payload.id,
                    firstName: action.payload.firstName,
                    lastName: action.payload.lastName,
                    age: action.payload.age,
                    email: action.payload.email,
                    orders: action.payload.orders,
                    role: action.payload.role,
                    img: action.payload.img
            }, authLoading: false, isUserCalled: true})
        }
        case UsersActionTypes.LoadAuthenticatedUser: {
            return Object.assign({}, state, {
                authenticatedUser: null,
                authLoading : true,
            })
        }
        case UsersActionTypes.AuthenticatedUserError: {
            return Object.assign({}, state, {
                authenticatedUser: null,
                authLoading: false,
                isUserCalled: true,
            })
        }
        case UsersActionTypes.AddUser: {
            return {
                ...state, dataLoading: true
            }
        }
        case UsersActionTypes.UpdateUser: {
            return {
                ...state, dataLoading: true,
            }
        }
        case UsersActionTypes.DeleteUser: {
            return {
                ...state, dataLoading: true,
            }
        }
        case UsersActionTypes.LoadUsers: {
            return {
                ...state, dataLoading: true,
            }
        }
        case UsersActionTypes.LoadUsersWithPaginationAndSort: {
            return {
                ...state, dataLoading: true,
            }
        }
        case UsersActionTypes.UserAdded: {
            return {
                ...adapter.addOne(action.payload, state), dataLoading: false
            }
        }
        case UsersActionTypes.UserDeleted: {
            return {
                ...adapter.removeOne(action.payload.id, state), dataLoading: false
            }
        }
        case UsersActionTypes.UserUpdated: {
            return {
                ...adapter.upsertOne(action.payload, state), dataLoading: false
            }
        }
        case UsersActionTypes.UsersLoaded: {
            return {
                ...adapter.setAll(action.payload, state), dataLoading: false
            }
        }
        case UsersActionTypes.UsersWithPaginationAndSortLoaded: {
            return {
                ...adapter.setAll(action.payload, state),
                dataLoading: false,
            }
        }
        case UsersActionTypes.LoadUsersWithPaginationAndSortError: {
            return {
                ...state,dataLoading : false,
            }
        }
        case UsersActionTypes.LoadUsersError: {
            return {
                ...state,dataLoading : false,
            }
        }
        case UsersActionTypes.UpdateUserError: {
            return {
                ...state,dataLoading : false,
            }
        }
        case UsersActionTypes.DeleteUserError: {
            return {
                ...state,dataLoading : false,
            }
        }
        case UsersActionTypes.AddUserError: {
            return {
                ...state,dataLoading : false,
            }
        }
        case UsersActionTypes.LogoutAuthenticatedUser: {
            return {...state, authLoading: true}
        }
        case UsersActionTypes.AuthenticatedUserLoggedOut: {
            return {...state, authLoading: false,authenticatedUser: null}
        }        
        case UsersActionTypes.AuthenticatedUserLoggedOutError: {
            return {...state, authLoading: false}
        }    
        default:
            return state
    }
}
export const getAuthenticatedUser = (state: UsersState) => state;

export const getDataLoading = (state: UsersState) => state.dataLoading;
const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();

export const selectUserIds = selectIds;

export const selectUserEntities = selectEntities;

export const selectAllUsers = selectAll;

export const selectUsersTotal = selectTotal;
