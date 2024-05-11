import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-billing-address',
  templateUrl: './billing-address.component.html',
  styleUrls: ['./billing-address.component.scss']
})
export class BillingAddressComponent {
  @Output() formData: EventEmitter<any> = new EventEmitter();
  billingForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.billingForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      city: ['', Validators.required],
      postalCode: ['', Validators.required],
      delivery: [true]
    });

    // Subscribe to form value changes
    this.billingForm.valueChanges.subscribe(data => {
      this.formData.emit(data);
    });
  }

  onDeliveryOptionChange(event: Event) {
    const deliveryOption = (event.target as HTMLInputElement).value;
    if (deliveryOption === 'storePickup') {
      this.billingForm.get('delivery')?.setValue(false);
    } else {
      this.billingForm.get('delivery')?.setValue(true);
    }
  }
}
