import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Product_detailsComponent } from './components/product_details/product_details.component';
import { Home_pageComponent } from './components/home_page/home_page.component';
const routes: Routes = [
  { path: 'details', component: Product_detailsComponent },
  { path: 'home', component: Home_pageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
