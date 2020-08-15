import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/** Injectable for ResourceService */
@Injectable()
export class ResourceService<T> {

  /** BASE_API_URL of the service to connect to */
  BASE_API_URL: string;

  /** Name of the endpoint to be used e.g. Customer, Invoice, etc */
  endpoint: string;

  /**
   * Constructor for ResourceService
   * @param httpClient HttpClient
   */
  constructor(private readonly httpClient: HttpClient) { }

  /**
   * Gives back an array of items
   * @return Observable<Array<T>>
   */
  list(): Observable<Array<T>> {
    return this.httpClient.get<Array<T>>(`${this.BASE_API_URL}/${this.endpoint}`);
  }

  /**
   * returns an Observable of the requested endpoint
   * @return Observable<T>
   */
  read(additionalParameters?: string): Observable<T> {
    return this.httpClient.get<T>(`${this.BASE_API_URL}/${this.endpoint}${additionalParameters ? additionalParameters : ''}`);
  }

  /**
   * returns an Observable based on an id from the endpoint
   * @param id string
   * @return Observable<T>
   */
  readOne(id: string): Observable<T> {
    return this.httpClient.get<T>(`${this.BASE_API_URL}/${this.endpoint}/${id}`);
  }

  /**
   * creates a new item T from in database
   *  @return Observable<T>
   */
  public create(item: T): Observable<T> {
    return this.httpClient.post<T>(`${this.BASE_API_URL}/${this.endpoint}`, item);
  }

   /**
    * creates a new item T from in database
    *  @return Observable<T>
    */
  public createOne(id: string, item: T): Observable<T> {
    return this.httpClient.post<T>(`${this.BASE_API_URL}/${this.endpoint}/${id}`, item) as Observable<T>;
  }

  /**
   * updates an item T from in database
   * @return Observable<T>
   */
  public update(id: string, item: T): Observable<T> {
    return this.httpClient.put<T>(`${this.BASE_API_URL}/${this.endpoint}/${id}`, item);
  }

  /**
   * deletes an item T from in database
   * @return Observable<any>
   */
  delete(id: string): Observable<any> {
    return this.httpClient.delete(`${this.BASE_API_URL}/${this.endpoint}/${id}`) as Observable<any>;
  }
}
