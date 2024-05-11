import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Credentials } from '../../shared/Credentials';
import { AuthService } from '../../services/auth.service';
import { LoginResponse } from '../../shared/LoginResponse';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  credentials: Credentials = {
    email: '',
    password: ''
  }
  constructor(private authService: AuthService, private router: Router) {

  }
  login(credentials: Credentials) {
    this.authService.authenticate(credentials).subscribe((response) => {
      if (response.status === 200) {
        const loginResponse: LoginResponse = response.body as LoginResponse;
        loginResponse.isAdmin ? this.router.navigateByUrl('/admin/users') : this.router.navigate(['/home']);
      }
    });
  }
}
