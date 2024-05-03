import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/apps/material/lib/material.module';
import { BasketComponent } from './components/basket/basket.component';


@NgModule({
  declarations: [
    BasketComponent
  ],
  imports: [
    MaterialModule,
    CommonModule
  ]
})
export class OrdersModule { }
