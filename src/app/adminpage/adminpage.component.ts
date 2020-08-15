import { Component, OnInit } from '@angular/core';
import { CheckoutService } from '../checkout/checkout.service';
import { Checkoutorder } from '../checkout/checkoutorder';

@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.component.html',
  styleUrls: ['./adminpage.component.scss']
})
export class AdminpageComponent implements OnInit {
  
  orders: Array<Checkoutorder>;
  
  constructor(private readonly checkoutService: CheckoutService) {}

  ngOnInit(): void {
    this.checkoutService.read('?companyId=592838').subscribe(data => {
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
}
