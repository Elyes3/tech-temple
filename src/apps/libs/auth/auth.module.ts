import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './views/login/login.component';
import { LogoComponent } from '../shared/logo/logo.component';


@NgModule({
  declarations: [
    LoginComponent,
        LogoComponent
  ],
  imports: [
    CommonModule,
    
  ]
})
export class AuthModule { }
