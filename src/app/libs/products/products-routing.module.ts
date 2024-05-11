import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Product_detailsComponent } from './components/product_details/product_details.component';
import { Home_pageComponent } from './components/home_page/home_page.component';
import { UserProfileComponent } from '../users-module/components/user-profile/user-profile.component';
import { UserReclamationComponent } from '../users-module/components/user-reclamation/user-reclamation.component';
const routes: Routes = [
  { path: 'details', component: Product_detailsComponent },
  { path: 'home', component: Home_pageComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'reclamation', component: UserReclamationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
