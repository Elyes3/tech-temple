import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketItemComponent } from './components/basket-item/basket-item.component';
import { BasketComponent } from './components/basket/basket.component';
import { CartService } from './services/cart.service';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { RouterModule } from '@angular/router';
import { PaymentComponent } from './components/payment/payment.component';
import { BillingAddressComponent } from './components/billing-address/billing-address.component';


@NgModule({
  declarations: [
    BasketItemComponent,
    BasketComponent,
    CheckoutComponent,
    PaymentComponent,
    BillingAddressComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    BasketItemComponent
  ],
  providers: [
    CartService
  ]
})
export class OrdersModule { }
