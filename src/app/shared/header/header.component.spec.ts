import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { HeaderComponent } from './header.component';
import { By } from '@angular/platform-browser';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, RouterTestingModule ],
      declarations: [ HeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    component.productsInCart = [];
    component.categories = [];
    component.amountInCart = 0;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('first a should be all products', () => {
    const a = fixture.debugElement.query(By.css('a')).nativeElement;

    expect(a.innerHTML).toBe('All products');
  });

  it('should be a span containing products.lengh and amount in cart price', () => {
    const span = fixture.debugElement.query(By.css('span')).nativeElement;

    /** Should be empty */
    expect(span.innerHTML).toBe('');


    fixture.detectChanges();
    /** should be beforeEach content */
    expect(span.innerHTML).toBe('0 products in checkout for $0');

    component.productsInCart = [{
      amount: 199,
      productId: 77
    }]
    component.amountInCart = 199;
    fixture.detectChanges();

    /** should be the correct amount of products */
    expect(span.innerHTML).toBe('1 products in checkout for $199');
  });
});
