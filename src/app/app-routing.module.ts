import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AdminpageComponent } from './adminpage/adminpage.component';

const routes: Routes = [
  { path: '', component: HomepageComponent},
  { path: 'category/:categoryId', component: HomepageComponent },
  { path: 'admin', component: AdminpageComponent},
  { path: 'check-out', component: CheckoutComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
