import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './libs/auth/views/login/login.component';
import { RegisterComponent } from './libs/auth/views/register/register.component';
import { ForgotPasswordComponent } from './libs/auth/views/forgot-password/forgot-password.component';
import { AuthRedirectGuard } from './libs/guards/authredirect.guard';
const routes: Routes = [
  { path: '', component: LoginComponent,canActivate : [AuthRedirectGuard] },
  { path: 'reset-password', component: ForgotPasswordComponent, canActivate : [AuthRedirectGuard] },
  {path : 'register', component : RegisterComponent, canActivate : [AuthRedirectGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
