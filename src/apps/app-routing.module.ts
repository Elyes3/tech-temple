import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersRoutingModule } from './libs/orders/orders-routing.module';
const routes: Routes = [
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    OrdersRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
