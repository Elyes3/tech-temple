import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { Credentials } from '../shared/Credentials';
import { User } from '../shared/User';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loginEndpoint = 'login';
  logoutEndpoint = 'logout';
  registerEndpoint = 'signup';
  sendResetEndpoint = 'send-reset';
  resetPasswordEndpoint = 'reset-password';
  constructor(private http: HttpClient, private router: Router) { }
  authenticate(credentials : Credentials) {
    return this.http.post(this.getLoginUrl(), credentials, { observe: 'response' })
  }
  logout() {
    console.log(this.getLogoutUrl())
    return this.http.get(this.getLogoutUrl());
  }
  register(user: User) {
    return this.http.post(this.getRegisterUrl(), user).subscribe({
      next: () => {
        this.router.navigate(['/'])
      },
    },
      );
  }
  sendReset(email: string) {
    return this.http.post(this.getSendResetUrl(), { email: email });
  }
  resetPassword(password : string, id: number, token: string) {
    return this.http.post(this.getResetPasswordUrl(), { password, id, token});
  }
  getLoginUrl(): string{
    return `${environment.API_URL}/api/${this.loginEndpoint}`
  }
  getLogoutUrl(): string{
    return `${environment.API_URL}/api/${this.logoutEndpoint}`
  }
  getRegisterUrl(): string{
    return `${environment.API_URL}/api/${this.registerEndpoint}`
  }
  getSendResetUrl(): string{
    return `${environment.API_URL}/api/${this.sendResetEndpoint}`
  }
  getResetPasswordUrl(): string{
    return `${environment.API_URL}/api/${this.resetPasswordEndpoint}`
  }
}

