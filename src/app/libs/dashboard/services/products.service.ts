import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginationInfo } from '../shared/PaginationInfo';
import { Product } from '../../shared/models/Product';
import { environment } from 'src/environments/environments';
import { FirebaseService } from '../../firebase/services/firebase.service';
import { ImageData } from '../shared/ImageData';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

constructor(private http: HttpClient, private firebaseService: FirebaseService) {}
  endpoint = "products";
  countEndpoint = "products/count"
  loadProducts() {
    return this.http.get<Product[]>(this.getUrl())
  }
  countProducts() {
    return this.http.get(this.getCountUrl())
  }
  loadProductsWithPaginationAndSort(paginationInfo : PaginationInfo) {
    return this.http.get<Product[]>(this.getPaginationUrl(paginationInfo))
  }
  updateProduct(id : string, product: Product) {
    return this.http.put<Product>(this.getUrlById(id),product);
  }
  deleteProduct(id : string) {
    return this.http.delete<Product>(this.getUrlById(id));
  }
  addProduct(product: Product) {
    return this.http.post<Product>(this.getUrl(), product);
  }
  getUrlById(id : string) : string {
    return `${environment.API_URL}/api/${this.endpoint}/${id}`
  }
  getPaginationUrl(paginationInfo : PaginationInfo) {
     return `${environment.API_URL}/api/${this.endpoint}?page=${paginationInfo.page}&sort=${paginationInfo.sort}&order=${paginationInfo.order}&size=${paginationInfo.size}`
  }

  getUrl() : string{
    return `${environment.API_URL}/api/${this.endpoint}`
  }
  getCountUrl() {
    return `${environment.API_URL}/api/${this.countEndpoint}`
  }
}
