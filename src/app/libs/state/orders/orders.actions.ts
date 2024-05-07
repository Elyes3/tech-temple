import { Action } from "@ngrx/store";
import { PaginationInfo } from "../../dashboard/shared/PaginationInfo";
import { Order } from "../../shared/models/Order";

export enum OrdersActionTypes {
    LoadOrdersWithPaginationAndSort = '[Orders] Load Orders with Pagination and Sort',
    OrdersWithPaginationAndSortLoaded = '[Orders] Orders with Pagination and Sort Loaded',
    LoadOrdersWithPaginationAndSortError = '[Orders] Load Orders with Pagination and Sort Error',
    LoadOrders = '[Orders] Load Orders',
    OrdersLoaded = '[Orders] Orders Loaded',
    LoadOrdersError = '[Orders] Load Orders Error',
    DeleteOrder = '[Orders] Delete Order',
    OrderDeleted = '[Orders] Order Deleted',
    DeleteOrderError = '[Orders] Delete Order Error',
    UpdateOrderStatus = '[Orders] Update Order Status',
    OrderStatusUpdated = '[Orders] Order Status Updated',
    UpdateOrderStatusError = '[Orders] Update Order Status Error',
}
export class LoadOrdersWithPaginationAndSort implements Action{
    readonly type = OrdersActionTypes.LoadOrdersWithPaginationAndSort
    constructor(public payload : PaginationInfo){}
}
export class OrdersWithPaginationAndSortLoaded implements Action{
    readonly type = OrdersActionTypes.OrdersWithPaginationAndSortLoaded
    constructor(public payload : Order[]){}
}
export class LoadOrdersWithPaginationAndSortError implements Action{
    readonly type = OrdersActionTypes.LoadOrdersWithPaginationAndSortError
    constructor(){}
}
export class LoadOrders implements Action{
    readonly type = OrdersActionTypes.LoadOrders;
    constructor() {}
}
export class OrdersLoaded implements Action{
    readonly type = OrdersActionTypes.OrdersLoaded;
    constructor(public payload: Order[]){}
}
export class LoadOrdersError implements Action{
    readonly type = OrdersActionTypes.LoadOrdersError;
    constructor() {}
}
export class UpdateOrderStatus implements Action{
    readonly type = OrdersActionTypes.UpdateOrderStatus;
    constructor (public payload : Order){}
}
export class OrderStatusUpdated implements Action{
    readonly type = OrdersActionTypes.OrderStatusUpdated;
    constructor (public payload : Order){}
}
export class UpdateOrderStatusError implements Action{
    readonly type = OrdersActionTypes.UpdateOrderStatusError;
    constructor() {}
}
export class DeleteOrder implements Action{
    readonly type = OrdersActionTypes.DeleteOrder;
    constructor (public payload : Order){}
}
export class OrderDeleted implements Action{
    readonly type = OrdersActionTypes.OrderDeleted;
    constructor (public payload : Order){}
}
export class DeleteOrderError implements Action{
    readonly type = OrdersActionTypes.DeleteOrderError;
    constructor() {}
}
export type OrdersActions = 
    | LoadOrdersWithPaginationAndSort
    | OrdersWithPaginationAndSortLoaded
    | LoadOrdersWithPaginationAndSortError
    | LoadOrders
    | OrdersLoaded
    | LoadOrdersError
    | UpdateOrderStatus
    | OrderStatusUpdated
    | UpdateOrderStatusError
    | DeleteOrder
    | OrderDeleted
    | DeleteOrderError
