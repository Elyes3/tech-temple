import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { OrdersService } from "../../dashboard/services/orders.service";
import { OrdersActionTypes, OrdersLoaded, OrdersWithPaginationAndSortLoaded, OrderDeleted, OrderStatusUpdated, DeleteOrder, LoadOrders, LoadOrdersWithPaginationAndSort, UpdateOrderStatus, LoadOrdersWithPaginationAndSortError, LoadOrdersError, UpdateOrderStatusError, DeleteOrderError } from "./orders.actions";
import { Order } from "../../shared/models/Order";
@Injectable()
export class OrdersEffects {
    constructor(
        private actions$: Actions,
        private ordersService: OrdersService,
    ) { }
    loadOrders$ = createEffect(() =>
        this.actions$.pipe(
            ofType(OrdersActionTypes.LoadOrders),
            switchMap((action: LoadOrders) =>
                this.ordersService.loadOrders().pipe(
                    map((res: Order[]) => new OrdersLoaded(res)),
                    catchError(error => of(new LoadOrdersError()))
                )
            )
        )
    );
        loadOrdersWithPaginationAndSort$ = createEffect(() =>
        this.actions$.pipe(
            ofType(OrdersActionTypes.LoadOrdersWithPaginationAndSort),
            switchMap((action: LoadOrdersWithPaginationAndSort) => {
                console.log("err2")
                return this.ordersService.loadOrdersWithPaginationAndSort(action.payload).pipe(
                    map((res: Order[]) =>  new OrdersWithPaginationAndSortLoaded(res) ),
                    catchError(error => of(new LoadOrdersWithPaginationAndSortError))
                )
            }
            )
        )
    );
    updateOrderStatus$ = createEffect(() =>
        this.actions$.pipe(
            ofType(OrdersActionTypes.UpdateOrderStatus),
            switchMap((action: UpdateOrderStatus) =>
                this.ordersService.updateOrderStatus(action.payload.id,action.payload).pipe(
                    map((res: Order) => new OrderStatusUpdated(res)),
                    catchError(error => of(new UpdateOrderStatusError))
)
            )
        )
    );
    deleteOrder$ = createEffect(() =>
        this.actions$.pipe(
            ofType(OrdersActionTypes.DeleteOrder),
            switchMap((action: DeleteOrder) =>
                this.ordersService.deleteOrder(action.payload.id).pipe(
                    map((res: Order) => new OrderDeleted(res)),
                    catchError(error => of(new DeleteOrderError))
                ),
            )
        )
    );
}