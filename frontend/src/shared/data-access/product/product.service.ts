import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product, ProductDto } from './interfaces';
import { catchError, Observable, throwError } from 'rxjs';
import { URL_API } from '../shared';
@Injectable()
export class ProductService {
  private readonly apiUrl = inject(URL_API);
  private readonly http = inject(HttpClient);

  getAllProduct(): Observable<Product[]> {
    return this.http
      .get<Product[]>(`${this.apiUrl}products`)
      .pipe(catchError((err) => throwError(() => err)));
  }

  createProduct(body: ProductDto): Observable<Product> {
    return this.http
      .post<Product>(`${this.apiUrl}products`, body)
      .pipe(catchError((err) => throwError(() => err)));
  }

  removeProduct(productId: string): Observable<Product> {
    return this.http
      .delete<Product>(`${this.apiUrl}products/${productId}`)
      .pipe(catchError((err) => throwError(() => err)));
  }
}
