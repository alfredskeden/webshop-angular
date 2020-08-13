import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() categories: Array<any>;

  @Input() productsInCart: Array<any>;

  @Input() amountInCart: number;

  ngOnInit(): void {
  }

  get filterByName(): Array<any> {
    return this.categories ? this.categories.filter( x => x.name != null ) : [];
  }
}
