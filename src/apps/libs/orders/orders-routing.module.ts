import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasketComponent } from './components/basket/basket.component';
const routes: Routes = [
  { path: 'basket', component: BasketComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
