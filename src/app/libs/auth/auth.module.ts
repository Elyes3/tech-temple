import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './views/login/login.component';
import { MaterialModule } from 'src/app/material/lib/material.module';
import { RegisterComponent } from './views/register/register.component';
import { TechTemplateComponent } from './components/tech-template/tech-template.component';
import { RouterModule } from '@angular/router';
import { ForgotPasswordComponent } from './views/forgot-password/forgot-password.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    TechTemplateComponent,
    ForgotPasswordComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    SharedModule
  ],
})
export class AuthModule { }
