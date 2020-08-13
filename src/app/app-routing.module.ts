import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { CheckoutComponent } from './homepage/checkout/checkout.component';
import { CategoryComponent } from './homepage/category/category.component';

const routes: Routes = [
  {
    path: '', component: HomepageComponent,
    children: [
      {
        path: 'check-out', component: CheckoutComponent
      },
      {
        path: '', component: CategoryComponent
      },
      {
        path: 'category/:categoryId', component: CategoryComponent
      }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
