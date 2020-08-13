import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CategoryService } from './category.service';
import { HomepageService } from '../homepage.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {


  products: Array<any>;

  categories: Array<any>;

  constructor(
    private readonly categoryService: CategoryService,
    private readonly homepageService: HomepageService,
    private readonly route: ActivatedRoute
    ) {}

  ngOnInit(): void {

    /** Fetches and gets the data for products with categories in the header */
    this.categoryService.list().subscribe(data => {
      this.products = data;
    }, err => {
      console.log(err);
    }, () => {

      this.homepageService.list().subscribe(data => {
        this.categories = data;
      }, err => {
        console.log(err);
      }, () => {
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

  get filterByName(): Array<any> {
    return this.categories ? this.categories.filter( x => x.name != null ) : [];
  }

  get filterProducts(): Array<any> {
    return (this.products && this.products.length) ?
           this.products.filter(x => this.filteredProductsByCategory(x.name, x.productCategory)) : [];
  }

  filteredProductsByCategory(name: string, category: Array<any>): boolean {

    if (!name) {
      return false;
    }

    const categoryId = this.route.snapshot.paramMap.get('categoryId');

    if (!categoryId) {
      return true;
    }

    for (const cate of category) {
      if (cate.categoryId.toString() === categoryId) {
        return true;
      }
    }

    return false;
  }
}
