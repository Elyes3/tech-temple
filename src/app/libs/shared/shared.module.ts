import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { LogoComponent } from './logo/logo.component';
import { PersonalMenuItemComponent } from './personal-menu-item/personal-menu-item.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    NavbarComponent,
    LogoComponent,
    PersonalMenuItemComponent,
    FooterComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    LogoComponent,
    NavbarComponent,
    PersonalMenuItemComponent,
    FooterComponent,
    SidebarComponent
  ]
})
export class SharedModule { }
