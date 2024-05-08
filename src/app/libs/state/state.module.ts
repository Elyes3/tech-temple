import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { reducers } from '.';
import { EffectsModule } from '@ngrx/effects';
import { UsersEffects } from './users/users.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CategoriesEffects } from './categories/categories.effects';
import { ProductsEffects } from './products/products.effects';
import { OrdersEffects } from './orders/orders.effects';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({ maxAge: 10 }),
    EffectsModule.forRoot(
      UsersEffects,
      CategoriesEffects,
      ProductsEffects,
      OrdersEffects,
    )

  ]
})
export class StateModule { }
