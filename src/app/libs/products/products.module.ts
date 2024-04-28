import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product_detailsComponent } from './components/product_details/product_details.component';
import { MaterialModule } from 'src/app/material/lib/material.module';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';
import { NgxImageZoomModule } from 'ngx-image-zoom';

@NgModule({
  declarations: [
    Product_detailsComponent
  ],
  imports: [
    NgxImageZoomModule,
    CommonModule,
    MaterialModule,
    MatGridListModule,
    MatTabsModule
  ]
})
export class ProductsModule { }
