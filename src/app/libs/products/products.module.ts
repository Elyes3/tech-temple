import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product_detailsComponent } from './components/product_details/product_details.component';
import { Home_pageComponent } from './components/home_page/home_page.component';
import { MaterialModule } from 'src/app/material/lib/material.module';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { UserProfileComponent } from '../users-module/components/user-profile/user-profile.component';
import { UserReclamationComponent } from '../users-module/components/user-reclamation/user-reclamation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    Product_detailsComponent,
    Home_pageComponent,
    UserProfileComponent,
    UserReclamationComponent
  ],
  imports: [
    NgxImageZoomModule,
    CommonModule,
    MaterialModule,
    MatGridListModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class ProductsModule { }
