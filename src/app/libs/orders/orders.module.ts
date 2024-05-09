import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketItemComponent } from './components/basket-item/basket-item.component';
import { BasketComponent } from './components/basket/basket.component';
import { CartService } from './services/cart.service';



@NgModule({
  declarations: [
    BasketItemComponent,
    BasketComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BasketItemComponent
  ],
  providers: [
    CartService
  ]
})
export class OrdersModule { }
