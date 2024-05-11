import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Invoice } from '../../shared/models/Invoice';
import { environment } from 'src/environments/environments';
@Injectable({
    providedIn: 'root'
})
export class InvoiceService {

    constructor(private http: HttpClient) { }

    getAllInvoices(): Observable<Invoice[]> {
        return this.http.get<Invoice[]>(`${environment.API_URL}/api/invoices`);
    }

    getInvoiceById(id: number): Observable<Invoice> {
        return this.http.get<Invoice>(`${environment.API_URL}/api/invoices/${id}`);
    }

    createInvoice(invoice: Invoice): Observable<Invoice> {
        return this.http.post<Invoice>(`${environment.API_URL}/api/invoices`, invoice);
    }

    updateInvoice(invoice: Invoice): Observable<Invoice> {
        const url = `${environment.API_URL}/api/invoices/${invoice.id}`;
        return this.http.put<Invoice>(url, invoice);
    }

    deleteInvoice(id: number): Observable<void> {
        const url = `${environment.API_URL}/api/invoices/${id}`;
        return this.http.delete<void>(url);
    }
}
