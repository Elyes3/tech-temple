import { Component } from '@angular/core';
import { UsersFacade } from '../../state/users/users.facade';

@Component({
  selector: 'app-personal-menu-item',
  templateUrl: './personal-menu-item.component.html',
  styleUrls: ['./personal-menu-item.component.scss']
})
export class PersonalMenuItemComponent {
  constructor(private usersFacade: UsersFacade) { }
  authenticatedUser$ = this.usersFacade.authenticatedUser$;
  
}
