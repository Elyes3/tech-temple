import { Component } from '@angular/core';
import { ComponentVisibilityService } from '../service/ComponentVisibilityService';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  categories = [
    'Computers',
    'Accessories & Supplies',
    'Security & Surveillance',
    'Video Game Consoles & Accessories',
    'Smart Home',
  ]

  isVisible$ = this.componentVisibilityService.isVisible$;

  constructor(private componentVisibilityService: ComponentVisibilityService) {}

}
