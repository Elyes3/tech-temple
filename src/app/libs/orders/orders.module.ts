import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketItemComponent } from './components/basket-item/basket-item.component';
import { BasketComponent } from './components/basket/basket.component';
import { CartService } from './services/cart.service';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { RouterModule } from '@angular/router';
import { PaymentComponent } from './components/payment/payment.component';
import { BillingAddressComponent } from './components/billing-address/billing-address.component';
import { MaterialModule } from 'src/app/material/lib/material.module';
import { InvoicePayedComponent } from './components/invoice-payed/invoice-payed.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    BasketItemComponent,
    BasketComponent,
    CheckoutComponent,
    PaymentComponent,
    BillingAddressComponent,
    InvoicePayedComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    BasketItemComponent
  ],
  providers: [
    CartService
  ]
})
export class OrdersModule { }
