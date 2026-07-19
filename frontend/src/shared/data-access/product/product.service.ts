import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product, ProductDto } from './interfaces';
import { catchError, Observable, of } from 'rxjs';
import { URL_API } from '../shared';
@Injectable()
export class ProductService {
  private readonly apiUrl = inject(URL_API);
  private readonly http = inject(HttpClient);

  getAllProduct(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}products`).pipe(catchError(() => of([])));
  }

  createProduct(body: ProductDto): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}products`, body);
  }

  removeProduct(productId: string): Observable<Product> {
    return this.http.delete<Product>(`${this.apiUrl}products/${productId}`);
  }
}
