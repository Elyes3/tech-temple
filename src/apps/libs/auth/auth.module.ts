import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './views/login/login.component';
import { LogoComponent } from '../shared/logo/logo.component';
import { MaterialModule } from 'src/apps/material/lib/material.module';
import { RegisterComponent } from './views/register/register.component';
import { TechTemplateComponent } from './components/tech-template/tech-template.component';
import { RouterModule } from '@angular/router';
import { ForgotPasswordComponent } from './views/forgot-password/forgot-password.component';


@NgModule({
  declarations: [
    LoginComponent,
    LogoComponent,
    RegisterComponent,
    TechTemplateComponent,
    ForgotPasswordComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
    
  ],
  exports: [
    LogoComponent
  ],
})
export class AuthModule { }
