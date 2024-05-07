import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.scss']
})
export class ChipsComponent {
  @Input()
  color: string = 'success';
  @Input()
  text: string = 'Chip';
}
