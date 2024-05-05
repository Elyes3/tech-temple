import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/lib/material.module';
import { RouterModule } from '@angular/router';
import { UsersComponent } from './views/users/users.component';
import { ProductsComponent } from './views/products/products.component';
import { OrdersComponent } from './views/orders/orders.component';
import { AdminComponent } from './views/admin/admin.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { TitleCardComponent } from './components/title-card/title-card.component';
import { FormsModule } from '@angular/forms';
import { UserFormDialogComponent } from './components/dialogs/user-form-dialog/user-form-dialog.component';
import { DeleteDialogComponent } from './components/dialogs/delete-dialog/delete-dialog.component';
import { CategoriesComponent } from './views/categories/categories.component';
import { CategoryFormDialogComponent } from './components/dialogs/category-form-dialog/category-form-dialog.component';
import { ProductFormDialogComponent } from './components/dialogs/product-form-dialog/product-form-dialog.component';


@NgModule({
  declarations: [
    UsersComponent,
    ProductsComponent,
    OrdersComponent,
    AdminComponent,
    TitleCardComponent,
    UserFormDialogComponent,
    DeleteDialogComponent,
    CategoriesComponent,
    CategoryFormDialogComponent,
    ProductFormDialogComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    DashboardRoutingModule,
    MaterialModule,
    FormsModule,
  ],
  exports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    DashboardRoutingModule,
    MaterialModule,
    FormsModule,
  ]
})
export class DashboardModule { }
