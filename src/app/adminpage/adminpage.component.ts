import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { CookieService } from 'ngx-cookie-service'; 

import { CheckoutService } from '../checkout/checkout.service';
import { Checkoutorder } from '../checkout/checkoutorder';

@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.component.html',
  styleUrls: ['./adminpage.component.scss']
})
export class AdminpageComponent implements OnInit {
  
  orders: Array<Checkoutorder>;

  searchForm;
  
  constructor(
    private readonly checkoutService: CheckoutService,
    private formBuilder: FormBuilder,
    private cookieService: CookieService
    ) {
    this.searchForm = this.formBuilder.group({
      name: this.cookieService.get('name'),
      email: this.cookieService.get('email')
    });
  }

  ngOnInit(): void {
    this.checkoutService.read('?companyId=794613').subscribe(data => {
      this.orders = data;
    }, err => { console.log(err)
    }, () => {
    } )
  }

  cancelOrder(orderId: number): void {
    this.checkoutService.delete(orderId.toString()).subscribe(data => {
    }, err => { console.log(err)
    }, () => {
      location.reload();
    } )
  }

  /** Returns a list of orders with that name and email */
  get ordersFromName(): Array<Checkoutorder> {

    if (this.searchForm.value.name === '794613') {
      return this.orders;
    }

    return this.orders ? this.orders.filter(x => x.createdBy === this.searchForm.value.name + ' ' + this.searchForm.value.email) : [];
  }
}
