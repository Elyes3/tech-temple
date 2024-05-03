import { Component,OnInit } from '@angular/core';
import { User } from '../../shared/User';
import { AuthService } from '../../services/auth.service';
import { UsersFacade } from 'src/app/libs/state/users/users.facade';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  users$: Observable<User[]> = this.usersFacade.allUsers$;
  user: User = {
    id : '',
    firstName: '',
    lastName: '',
    age: 0,
    email: '',
    password:''
  }
  ngOnInit(): void {
    console.log("CALLED")
    this.usersFacade.loadUsers();
  }
  constructor(private authService: AuthService, private usersFacade: UsersFacade) {
  }
  register(user : User) {
    this.authService.register(user)
  }
}
