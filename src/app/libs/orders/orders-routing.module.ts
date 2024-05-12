import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasketComponent } from './components/basket/basket.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { UserGuard } from '../guards/user.guard';
const routes: Routes = [
  { path: 'basket', component: BasketComponent, canActivate: [UserGuard]},
  { path: 'checkout/:orderId', component: CheckoutComponent, canActivate: [UserGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
