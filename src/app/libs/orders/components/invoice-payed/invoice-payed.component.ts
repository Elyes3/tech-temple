import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-invoice-payed',
  templateUrl: './invoice-payed.component.html',
  styleUrls: ['./invoice-payed.component.scss']
})
export class InvoicePayedComponent {
  @Input() imageUrl!: string;
  @Input() message!: string;

  constructor() { }
}
