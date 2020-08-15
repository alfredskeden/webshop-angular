import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CookieService } from 'ngx-cookie-service'; 

import { HomepageService, CategoriesService } from './homepage.service';
import { Checkoutorderproduct } from '../checkout/checkoutorderproduct';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  products: Array<any>;

  categories: Array<any>;

  productsInCart: Array<Checkoutorderproduct> = [];

  loading: boolean = true;

  constructor(
    private readonly categoryService: CategoriesService,
    private readonly homepageService: HomepageService,
    private cookieService: CookieService,
    private readonly router: Router
    ) {
      this.productsInCart = this.cookieService.get('cart') ? JSON.parse(this.cookieService.get('cart')) : [];
    }

  ngOnInit(): void {

    /** Fetches and gets the data for products with categories in the header */
    this.categoryService.list().subscribe(data => {
      this.categories = data;
    }, err => {
      console.log(err);
    }, () => {

      /** when done fetching categories fetch the products data */
      this.homepageService.list().subscribe(data => {
        this.products = data;
      }, err => {
        console.log(err);
      }, () => {

        this.setAllhasBeenAddedToCart();

        /** can be done sooo much better :D */
        for (const product of this.products) {
          for (const category of product.productCategory) {
            for (const categorie of this.categories) {
              if (categorie.id === category.categoryId) {
                category.category = categorie.name;
              }
            }
          }
        }

        this.loading = false;
      });
    });
  }

  /** Method to set products hasBeenAddedToCart if they have been added before */
  setAllhasBeenAddedToCart(): void {
    if (this.productsInCart && this.productsInCart.length) {
      for (const productInCart of this.productsInCart) {
        this.products.find(x => x.id === productInCart.productId).hasBeenAddedToCart = !this.products.find(x => x.id === productInCart.productId).hasBeenAddedToCart;
      }
    }
  }

  /** adds the products to cart */
  addProductToCart(value): void {

    /** find index and removes it if it dosnt exist add it */
    const index = this.productsInCart.findIndex(x => x.productId === value.id);
    if (index > -1) {
      this.productsInCart.splice(index, 1);
    } else {
      const productTemp = new Checkoutorderproduct();
      productTemp.amount = value.price;
      productTemp.productId = value.id;

      this.productsInCart.push(productTemp);
    }

    /** Save again to cookie cart */
    this.cookieService.set('cart', JSON.stringify(this.productsInCart));

    /** Toggles the button to correct color on that product */
    this.products.find(x => x.id === value.id).hasBeenAddedToCart = !this.products.find(x => x.id === value.id).hasBeenAddedToCart;
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
}
