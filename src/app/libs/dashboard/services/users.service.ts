import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { User } from '../../auth/shared/User';
import { PaginationInfo } from '../shared/PaginationInfo';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) {}
  endpoint = "users";
  endpointAuthenticatedUser = "auth";
  countEndpoint = "users/count"
  loadUsers() {
    return this.http.get<User[]>(this.getUrl())
  }
  countUsers() {
    return this.http.get(this.getCountUrl())
  }
  loadUsersWithPaginationAndSort(paginationInfo : PaginationInfo) {
    return this.http.get<User[]>(this.getPaginationUrl(paginationInfo))
  }
  loadAuthenticatedUser() {
    return this.http.get<User>(this.getAuthenticatedUserUrl())
  }
  updateUser(id : string, user: User) {
    return this.http.put<User>(this.getUrlById(id),user);
  }
  deleteUser(id : string) {
    return this.http.delete<User>(this.getUrlById(id));
  }
  addUser(user: User) {
    return this.http.post<User>(this.getUrl(), user);
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
  getAuthenticatedUserUrl() {
    return `${environment.API_URL}/api/${this.endpointAuthenticatedUser}`
  }
  getCountUrl() {
    return `${environment.API_URL}/api/${this.countEndpoint}`
  }

}
