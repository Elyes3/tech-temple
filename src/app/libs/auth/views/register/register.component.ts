import { Component } from '@angular/core';
import { User } from '../../shared/User';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  user: User = {
    id : '',
    firstName: '',
    lastName: '',
    age: 0,
    email: '',
    password:''
  }
  constructor(private authService: AuthService) {
  }
  register(user : User) {
    this.authService.register(user)
  }
}
