import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product_detailsComponent } from './components/product_details/product_details.component';
import { MaterialModule } from 'src/app/material/lib/material.module';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [
    Product_detailsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    MatGridListModule,
    MatTabsModule
  ]
})
export class ProductsModule { }
