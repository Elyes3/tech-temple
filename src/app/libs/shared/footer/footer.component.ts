import { Component } from '@angular/core';
import { ComponentVisibilityService } from '../service/ComponentVisibilityService';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  isVisible$ = this.componentVisibilityService.isVisible$;

  constructor(private componentVisibilityService: ComponentVisibilityService) {}

  toggle() {
    this.componentVisibilityService.toggleVisibility();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}
