import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasketComponent } from './components/basket/basket.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
const routes: Routes = [
  { path: 'basket', component: BasketComponent },
  { path: 'checkout/:orderId', component: CheckoutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
