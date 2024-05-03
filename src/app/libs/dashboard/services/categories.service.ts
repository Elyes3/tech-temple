import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../../shared/models/Category';
import { PaginationInfo } from '../shared/PaginationInfo';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  constructor(private http: HttpClient) {}
  endpoint = "product-categories";
  countEndpoint = "product-categories/count"
  loadCategories() {
    return this.http.get<Category[]>(this.getUrl())
  }
  countCategories() {
    return this.http.get(this.getCountUrl())
  }
  loadCategoriesWithPaginationAndSort(paginationInfo : PaginationInfo) {
    return this.http.get<Category[]>(this.getPaginationUrl(paginationInfo))
  }
  updateCategory(id : string, category: Category) {
    return this.http.put<Category>(this.getUrlById(id),category);
  }
  deleteCategory(id : string) {
    return this.http.delete<Category>(this.getUrlById(id));
  }
  addCategory(category : Category) {
    return this.http.post<Category>(this.getUrl(), category);
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