import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersRoutingModule } from './libs/orders/orders-routing.module';
import { LoginComponent } from './libs/auth/views/login/login.component';
import { RegisterComponent } from './libs/auth/views/register/register.component';
import { ForgotPasswordComponent } from './libs/auth/views/forgot-password/forgot-password.component';
const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'reset-password', component: ForgotPasswordComponent },
  {path : 'register', component : RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    OrdersRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
