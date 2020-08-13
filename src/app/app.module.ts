import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { CheckoutComponent } from './homepage/checkout/checkout.component';
import { CategoryComponent } from './homepage/category/category.component';

import { HomepageService } from './homepage/homepage.service';
import { CategoryService } from './homepage/category/category.service';
import { ResourceService } from './shared/resource.service';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    CheckoutComponent,
    CategoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    HomepageService,
    CategoryService,
    ResourceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
