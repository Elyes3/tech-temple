import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './views/users/users.component';
import { ProductsComponent } from './views/products/products.component';
import { OrdersComponent } from './views/orders/orders.component';
import { AdminComponent } from './views/admin/admin.component';
import { CategoriesComponent } from './views/categories/categories.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
      children: [
        { path: 'users', component: UsersComponent },
        { path: 'products', component: ProductsComponent },
        { path: 'orders', component: OrdersComponent },
        { path: 'categories',component: CategoriesComponent }
      ]
    }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { 
}
