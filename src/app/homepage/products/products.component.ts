import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  @Input() products: Array<any>;

  @Output() addToCartOutput = new EventEmitter();

  constructor(private readonly route: ActivatedRoute) {}

  ngOnInit(): void {
  }

  /** Emits the product to the add to cart function in homepage.componet.ts */
  addToCart(product: Array<any>): void {
    this.addToCartOutput.emit(product);
  }

  /** Filters the products to the page if category has been chosen */
  get filterProducts(): Array<any> {
    return (this.products && this.products.length) ?
           this.products.filter(x => this.filteredProductsByCategory(x.name, x.productCategory)) : [];
  }

  /** filter by products in category */
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
