import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../../shared/models/Order';
import { environment } from 'src/environments/environments';

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    constructor(private http: HttpClient) { }

    createOrder(orderData: Order): Observable<Order> {
        return this.http.post<Order>(`${environment.API_URL}/api/product-orders`, orderData);
    }

    updateInvoiceForOrder(orderId: string, invoiceData: any): Observable<any> {
        return this.http.put<any>(`${environment.API_URL}/api/product-orders/${orderId}/invoice`, invoiceData);
    }
}
