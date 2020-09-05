import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CheckoutService } from './checkout.service';

import { CookieService } from 'ngx-cookie-service'; 

import { Checkoutorder } from './checkoutorder';
import { Checkoutorderproduct } from './checkoutorderproduct';
import { HomepageService } from '../homepage/homepage.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  products: Array<any>;

  productsInCart: Array<Checkoutorderproduct> = [];

  checkoutForm;

  loading: boolean = true;

  constructor(
    private readonly checkoutService: CheckoutService,
    private readonly homepageService: HomepageService,
    private formBuilder: FormBuilder,
    private cookieService: CookieService
    ) {
      this.productsInCart = this.cookieService.get('cart') ? JSON.parse(this.cookieService.get('cart')) : [];

      this.checkoutForm = this.formBuilder.group({
        name: this.cookieService.get('name'),
        email: this.cookieService.get('email'),
        paymentMethod: ''
      });
  }

  ngOnInit(): void {

    /** when done fetching categories fetch the products data */
    this.homepageService.list().subscribe(data => {
      this.products = data;
    }, err => {
      console.log(err);
    }, () => {
      this.loading = false;
    });
  }

  onSubmit(customerData): void {
    
    if (this.productsInCart && !this.productsInCart.length) {
      return undefined;
    }

    const order = new Checkoutorder();
    order.companyId = 794613; //Random number that we have as companyId
    order.created = new Date().toISOString();
    order.createdBy = customerData.name + ' ' + customerData.email;
    order.paymentMethod = customerData.paymentMethod;
    order.totalPrice = this.calcAmountInCart();
    order.status = 1;
    order.orderRows = this.productsInCart;

    this.pressSendOrder(order);

    this.cookieService.set('name', customerData.name);
    this.cookieService.set('email', customerData.email);
  }

  /** method to send the order to backend */
  pressSendOrder(order: Checkoutorder): void {
    this.checkoutService.create(order).subscribe(data => {
    }, err => {
      console.log(err);
    }, () => {
      this.cookieService.delete('cart');
      this.productsInCart = [];
    })
  }

  /** Calcs the totalt cost in cart */
  calcAmountInCart(): number {

    let sum = 0;
    if (this.productsInCart && this.productsInCart.length) {
      for (const productInCart of this.productsInCart) {
        sum = sum + productInCart.amount;
      }
    }

    return sum;
  }

  /** Fetches the correct data from products array */
  get productFromProducts(): Array<any> {
    return this.productsInCart && this.productsInCart.length ? this.products.filter(x => {
      for (const product of this.productsInCart) {
        if (product.productId === x.id) {
          return true;
        }
      }

      return false;
    }) : [];
  }
}
