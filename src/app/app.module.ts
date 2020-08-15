import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { CheckoutComponent } from './checkout/checkout.component';

import { HomepageService, CategoriesService } from './homepage/homepage.service';
import { ResourceService } from './shared/resource.service';
import { HeaderComponent } from './shared/header/header.component';
import { ProductsComponent } from './homepage/products/products.component';
import { CheckoutService } from './checkout/checkout.service';
import { AdminpageComponent } from './adminpage/adminpage.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    CheckoutComponent,
    HeaderComponent,
    ProductsComponent,
    AdminpageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    HomepageService,
    CategoriesService,
    ResourceService,
    CheckoutService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
