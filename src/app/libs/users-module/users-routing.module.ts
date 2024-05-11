import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserReclamationComponent } from './components/user-reclamation/user-reclamation.component';
const routes: Routes = [
   { path: 'profile', component: UserProfileComponent },
   { path: 'reclamation', component: UserReclamationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }