import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent {
  @Input() firstTColor= '#858AE3';
  @Input() secondTColor= '#2C0735';
  @Input() firstEColor= '#2C0735';
  @Input() secondEColor = '#858AE3';
  @Input() width = '317';
  @Input() height = '217';
}
