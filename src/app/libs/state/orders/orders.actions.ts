import { Action } from "@ngrx/store";
import { PaginationInfo } from "../../dashboard/shared/PaginationInfo";
import { Order } from "../../shared/models/Order";

export enum OrdersActionTypes {
    LoadOrdersWithPaginationAndSort = '[Orders] Load Orders with Pagination and Sort',
    OrdersWithPaginationAndSortLoaded = '[Orders] Orders with Pagination and Sort Loaded',
    LoadOrders = '[Orders] Load Orders',
    OrdersLoaded = '[Orders] Orders Loaded',
    DeleteOrder = '[Orders] Delete Order',
    OrderDeleted = '[Orders] Order Deleted',
    UpdateOrderStatus = '[Orders] Update Order Status',
    OrderStatusUpdated = '[Orders] Order Status Updated',
}
export class LoadOrdersWithPaginationAndSort implements Action{
    readonly type = OrdersActionTypes.LoadOrdersWithPaginationAndSort
    constructor(public payload : PaginationInfo){}
}
export class OrdersWithPaginationAndSortLoaded implements Action{
    readonly type = OrdersActionTypes.OrdersWithPaginationAndSortLoaded
    constructor(public payload : Order[]){}
}
export class LoadOrders implements Action{
    readonly type = OrdersActionTypes.LoadOrders;
    constructor() { }
}
export class OrdersLoaded implements Action{
    readonly type = OrdersActionTypes.OrdersLoaded;
    constructor(public payload: Order[]){ }
}
export class UpdateOrderStatus implements Action{
    readonly type = OrdersActionTypes.UpdateOrderStatus;
    constructor (public payload : Order){ }
}
export class OrderStatusUpdated implements Action{
    readonly type = OrdersActionTypes.OrderStatusUpdated;
    constructor (public payload : Order){ }
}
export class DeleteOrder implements Action{
    readonly type = OrdersActionTypes.DeleteOrder;
    constructor (public payload : Order){ }
}
export class OrderDeleted implements Action{
    readonly type = OrdersActionTypes.OrderDeleted;
    constructor (public payload : Order){ }
}
export type OrdersActions = 
    | LoadOrdersWithPaginationAndSort
    | OrdersWithPaginationAndSortLoaded
    | LoadOrders
    | OrdersLoaded
    | UpdateOrderStatus
    | OrderStatusUpdated
    | DeleteOrder
    | OrderDeleted
