import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Product_detailsComponent } from './components/product_details/product_details.component';
import { Home_pageComponent } from './components/home_page/home_page.component';
import { Product_listComponent } from './components/product_list/product_list.component';
const routes: Routes = [
  { path: 'details', component: Product_detailsComponent },
  { path: 'home', component: Home_pageComponent },
  { path: 'prod_list', component: Product_listComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
