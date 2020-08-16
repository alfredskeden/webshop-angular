import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminpageComponent } from './adminpage.component';
import { CheckoutService } from '../checkout/checkout.service';

describe('AdminpageComponent', () => {
  let component: AdminpageComponent;
  let fixture: ComponentFixture<AdminpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminpageComponent ],
      providers: [ CheckoutService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
