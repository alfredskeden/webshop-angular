import { TestBed } from '@angular/core/testing';

import { HomepageService } from './homepage.service';
import { HttpClient } from '@angular/common/http';

describe('HomepageService', () => {
  let service: HomepageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ HomepageService, HttpClient ]
    });
    service = TestBed.inject(HomepageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
