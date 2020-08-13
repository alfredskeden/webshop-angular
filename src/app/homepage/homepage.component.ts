import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HomepageService, CategoriesService } from './homepage.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  products: Array<any>;

  categories: Array<any>;

  productsInCart: Array<any> = [];

  constructor(
    private readonly categoryService: CategoriesService,
    private readonly homepageService: HomepageService,
    private readonly router: Router
    ) {}

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
      });
    });
  }

/** adds the products to cart */
  addProductToCart(value): void {
    if (this.productsInCart.find(x => x.id === value.id)) {
      this.productsInCart.splice(this.productsInCart.indexOf(value));
    } else {
      this.productsInCart.push(value);
    }

    /** Toggles the button to correct color on that product */
    this.products.find(x => x.id === value.id).hasBeenAddedToCart = !this.products.find(x => x.id === value.id).hasBeenAddedToCart;
  }

  calcAmountInCart(): number {

    let sum = 0;
    if (this.productsInCart && this.productsInCart.length) {
      for (const productInCart of this.productsInCart) {
        sum = sum + productInCart.price;
      }
    }

    return sum;
  }
}
