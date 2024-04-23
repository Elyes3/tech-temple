import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isSearching: boolean = false;

  toggleSearch(): void {
    this.isSearching = !this.isSearching;
  }
}
