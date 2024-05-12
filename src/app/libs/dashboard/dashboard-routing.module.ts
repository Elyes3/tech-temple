import { Injectable, NgModule } from '@angular/core';
import { RouterModule, Routes, mapToCanActivate } from '@angular/router';
import { UsersComponent } from './views/users/users.component';
import { ProductsComponent } from './views/products/products.component';
import { OrdersComponent } from './views/orders/orders.component';
import { AdminComponent } from './views/admin/admin.component';
import { CategoriesComponent } from './views/categories/categories.component';
import { AdminGuard } from '../guards/admin.guard';
const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,

      children: [
        { path: 'users', component: UsersComponent, canActivate: [AdminGuard], },
        { path: 'products', component: ProductsComponent, canActivate: [AdminGuard] },
        { path: 'orders', component: OrdersComponent, canActivate: [AdminGuard]  },
        { path: 'categories',component: CategoriesComponent, canActivate: [AdminGuard]  }
      ]
    }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { 
}
