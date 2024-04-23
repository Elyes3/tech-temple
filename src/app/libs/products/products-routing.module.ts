import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Product_detailsComponent } from './components/product_details/product_details.component';
const routes: Routes = [
  { path: 'details', component: Product_detailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
