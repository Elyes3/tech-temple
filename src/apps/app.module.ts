import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/lib/material.module';
import { NavbarComponent } from './libs/shared/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrdersModule } from './libs/orders/orders.module';
import { PersonalMenuItemComponent } from './libs/shared/personal-menu-item/personal-menu-item.component';
import { LogoComponent } from './libs/shared/logo/logo.component';
import { AuthModule } from './libs/auth/auth.module';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PersonalMenuItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    OrdersModule,
    BrowserAnimationsModule,
    AuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
