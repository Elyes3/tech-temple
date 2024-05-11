import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentVisibilityService } from '../service/ComponentVisibilityService';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  isVisible$ = this.componentVisibilityService.isVisible$;

  constructor(private componentVisibilityService: ComponentVisibilityService) {}


  isSearching: boolean = false;


  toggleSearch(): void {
    this.isSearching = !this.isSearching;
  }

  toggle() {
    this.componentVisibilityService.toggleVisibility();
  }
}
