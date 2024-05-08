import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginationInfo } from '../shared/PaginationInfo';
import { Order } from '../../shared/models/Order';
import { environment } from 'src/environments/environments';
import { FirebaseService } from '../../firebase/services/firebase.service';
import { OrderStatus } from '../../shared/enum/OrderStatus';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

constructor(private http: HttpClient) {}
  endpoint = "product-orders";
  countEndpoint = "product-orders/count"
  loadOrders() {
    return this.http.get<Order[]>(this.getUrl())
  }
  countOrders() {
    return this.http.get(this.getCountUrl())
  }
  loadOrdersWithPaginationAndSort(paginationInfo: PaginationInfo) {
    console.log("CALLING");
    return this.http.get<Order[]>(this.getPaginationUrl(paginationInfo))
  }
  updateOrderStatus(id: string, order : Order) {
    return this.http.patch<Order>(this.getUrlById(id),order)
  }
  deleteOrder(id : string) {
    return this.http.delete<Order>(this.getUrlById(id));
  }
  getPaginationUrl(paginationInfo : PaginationInfo) {
     return `${environment.API_URL}/api/${this.endpoint}?page=${paginationInfo.page}&sort=${paginationInfo.sort},${paginationInfo.order}&size=${paginationInfo.size}`
  }
  getUrlById(id : string) : string {
    return `${environment.API_URL}/api/${this.endpoint}/${id}`
  }
  getUrl() : string{
    return `${environment.API_URL}/api/${this.endpoint}`
  }
  getCountUrl() {
    return `${environment.API_URL}/api/${this.countEndpoint}`
  }
}
