import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { OrdersActions, OrdersActionTypes } from './orders.actions';
import { Order } from '../../shared/models/Order';
export interface OrdersState extends EntityState<Order>{
    loading: boolean
}
export const adapter: EntityAdapter<Order> = createEntityAdapter<Order>();
export const initialState: OrdersState = adapter.getInitialState({
    loading: false,
})
export function ordersReducer(state : OrdersState = initialState, action: OrdersActions): OrdersState {
    switch (action.type) {
        case OrdersActionTypes.LoadOrders: {
            return {
                ...state, loading: true,
            }
        }
        case OrdersActionTypes.OrdersLoaded: {
            return {
                ...adapter.setAll(action.payload, state), loading: false
            }
        }
        case OrdersActionTypes.UpdateOrderStatus: {
            return {
                ...state, loading: true,
            }
        }
        case OrdersActionTypes.OrderStatusUpdated: {
            return {
                ...adapter.upsertOne(action.payload, state), loading: false
            }
        }
        case OrdersActionTypes.DeleteOrder: {
            return {
                ...state, loading: true,
            }
        }
        case OrdersActionTypes.OrderDeleted: {
            return {
                ...adapter.removeOne(action.payload.id, state), loading: false
            }
        }
        case OrdersActionTypes.LoadOrdersWithPaginationAndSort: {
            return {
                ...state, loading: true,
            }
        }
        case OrdersActionTypes.OrdersWithPaginationAndSortLoaded: {
            console.log("ERR4")
            return {
                ...adapter.setAll(action.payload, state),
                loading: false,
            }
        }
        default:
            return state
    }
}
export const getLoading = (state: OrdersState) => state.loading;
const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();

export const selectOrderIds = selectIds;

export const selectOrderEntities = selectEntities;

export const selectAllOrders = selectAll;

export const selectOrdersTotal = selectTotal;
