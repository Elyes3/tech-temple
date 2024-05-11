import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicePayedComponent } from './invoice-payed.component';

describe('InvoicePayedComponent', () => {
  let component: InvoicePayedComponent;
  let fixture: ComponentFixture<InvoicePayedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvoicePayedComponent]
    });
    fixture = TestBed.createComponent(InvoicePayedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
