import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environments';
import { User } from '../../auth/shared/User';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient, private router: Router) {}
  endpoint = "users";
  endpointAuthenticatedUser = "auth";
  loadUsers() {
    return this.http.get<User[]>(this.getUrl())
  }
  loadAuthenticatedUser() {
    return this.http.get<User>(this.getAuthenticatedUserUrl())
  }
  updateUser(id : string, user: User) {
    return this.http.put<User>(this.getUrlById(id),user);
  }
  deleteUser(id : string, user: User) {
    return this.http.delete<User>(this.getUrlById(id));
  }
  addUser(user: User) {
    return this.http.post<User>(this.getUrl(), user);
  }
  getUrlById(id : string) : string {
    return `${environment.API_URL}/api/${this.endpoint}/${id}`
  }
  getUrl() : string{
    return `${environment.API_URL}/api/${this.endpoint}`
  }
  getAuthenticatedUserUrl() {
    return `${environment.API_URL}/api/${this.endpointAuthenticatedUser}`
  }


}
