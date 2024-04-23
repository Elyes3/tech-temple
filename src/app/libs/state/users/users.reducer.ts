import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { User } from '../../auth/shared/User';
import { UsersActions, UsersActionTypes } from './users.actions';
export interface UsersState extends EntityState<User>{
    authenticatedUser: User | null;
}
export const adapter: EntityAdapter<User> = createEntityAdapter<User>();
export const initialState: UsersState = adapter.getInitialState({
    authenticatedUser: null
})
export function usersReducer(state = initialState, action: UsersActions): UsersState {
    switch (action.type) {
        case UsersActionTypes.AuthenticatedUserLoaded: {
            return Object.assign({}, state, {authenticatedUser : action.payload})
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
