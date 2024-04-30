import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/lib/material.module';
import { NavbarComponent } from './libs/shared/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrdersModule } from './libs/orders/orders.module';
import { PersonalMenuItemComponent } from './libs/shared/personal-menu-item/personal-menu-item.component';
import { AuthModule } from './libs/auth/auth.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ResponseInterceptor } from './libs/interceptors/response.interceptor';
import { JwtInterceptor } from './libs/interceptors/jwt.interceptor';
import { StateModule } from './libs/state/state.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DashboardModule } from './libs/dashboard/dashboard.module';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environments';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PersonalMenuItemComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    OrdersModule,
    BrowserAnimationsModule,
    AuthModule,
    StateModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    DashboardModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
