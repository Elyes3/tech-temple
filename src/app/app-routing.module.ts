import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './libs/auth/views/login/login.component';
import { RegisterComponent } from './libs/auth/views/register/register.component';
import { ForgotPasswordComponent } from './libs/auth/views/forgot-password/forgot-password.component';
import { AuthRedirectGuard } from './libs/guards/authredirect.guard';
import { OrdersRoutingModule } from './libs/orders/orders-routing.module';
import { DashboardRoutingModule } from './libs/dashboard/dashboard-routing.module';
import { ProductsRoutingModule } from './libs/products/products-routing.module';
import { UsersModuleModule } from './libs/users-module/users-module.module';
import { UsersRoutingModule } from './libs/users-module/users-routing.module';
import { SharedModule } from './libs/shared/shared.module';
const routes: Routes = [
  { path: '', component: LoginComponent,canActivate : [AuthRedirectGuard] },
  { path: 'reset-password', component: ForgotPasswordComponent, canActivate : [AuthRedirectGuard] },
  { path : 'register', component : RegisterComponent, canActivate : [AuthRedirectGuard]},
  { path : 'register', component : RegisterComponent, canActivate : [AuthRedirectGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    OrdersRoutingModule,
    DashboardRoutingModule,
    ProductsRoutingModule,
    ProductsRoutingModule,
    UsersRoutingModule,
    SharedModule,
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
