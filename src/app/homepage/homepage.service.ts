import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResourceService } from '../shared/resource.service';

/**
 * Injectable for HomepageService
 */
@Injectable()
export class HomepageService extends ResourceService<any> {

  /**
   * Constructor for ProcessService
   * @param httpClient HttpClient
   */
  constructor(httpClient: HttpClient) {
    super(httpClient);
    /** @todo: make dynamic for future apps (whats the best way?) */
    this.BASE_API_URL = 'https://medieinstitutet-wie-products.azurewebsites.net/api';
    this.endpoint = 'categories';
  }
}