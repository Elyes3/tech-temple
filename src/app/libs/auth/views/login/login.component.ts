import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Credentials } from '../../shared/Credentials';
import { AuthService } from '../../services/auth.service';
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
  constructor(private authService: AuthService ) {
    
  }
  login(credentials: Credentials) {
    this.authService.authenticate(credentials).subscribe();
    
  }
}
