import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { User } from '../../auth/shared/User';
import { UsersActions, UsersActionTypes } from './users.actions';
export interface UsersState extends EntityState<User>{
    authenticatedUser: User | null;
    loading: boolean,
}
export const adapter: EntityAdapter<User> = createEntityAdapter<User>();
export const initialState: UsersState = adapter.getInitialState({
    authenticatedUser: null,
    loading: false,
})
export function usersReducer(state : UsersState | undefined = initialState, action: UsersActions): UsersState {
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
            }, loading: false})
        }
        case UsersActionTypes.LoadAuthenticatedUser: {
            return Object.assign({}, state, {
                authenticatedUser: null,
                loading : true,
            })
        }
        case UsersActionTypes.AuthenticatedUserError: {
            return Object.assign({}, state, {
                authenticatedUser: null,
                loading : false,
            })
        }
        case UsersActionTypes.UserAdded: {
            return adapter.addOne(action.payload, state)
        }
        case UsersActionTypes.UserDeleted: {
            return adapter.removeOne(action.payload.id, state)
        }
        case UsersActionTypes.UserUpdated: {
            return adapter.upsertOne(action.payload, state)
        }
        case UsersActionTypes.UsersLoaded: {
            return adapter.setAll(action.payload, state)
        }
        default:
            return state
    }
}
export const getAuthenticatedUser = (state: UsersState) => state;

const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();

export const selectUserIds = selectIds;

export const selectUserEntities = selectEntities;

export const selectAllUsers = selectAll;

export const selectUsersTotal = selectTotal;
