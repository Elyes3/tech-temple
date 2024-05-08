import { Injectable } from '@angular/core';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import * as OrdersActions from './orders.actions';
import { PaginationInfo } from '../../dashboard/shared/PaginationInfo';
import { OrdersState, getLoading } from './orders.reducer';
import { OrdersActionTypes } from './orders.actions';
import { Order } from '../../shared/models/Order';
import { selectAllOrders } from '..';
@Injectable({
  providedIn: 'root'
})
export class OrdersFacade {
  allOrders$ = this.store.pipe(select(selectAllOrders));
  isLoading$ = this.store.pipe(select(getLoading))
  mutations$ = this.actions$
    .pipe(
      filter(action =>
        action.type === OrdersActionTypes.UpdateOrderStatus
        || action.type === OrdersActionTypes.DeleteOrder

      )
    );

  constructor(private store: Store<OrdersState>, private actions$: ActionsSubject) {}

  loadOrders() {
    this.store.dispatch(new OrdersActions.LoadOrders());
  }
  loadOrdersWithPaginationAndSort(paginationInfo: PaginationInfo) {
    console.log("err")
    this.store.dispatch(new OrdersActions.LoadOrdersWithPaginationAndSort(paginationInfo))
  }
  updateOrder(order : Order) {
    this.store.dispatch(new OrdersActions.UpdateOrderStatus(order));
  }

  deleteOrder(order : Order) {
    this.store.dispatch(new OrdersActions.DeleteOrder(order));
  }
  
}