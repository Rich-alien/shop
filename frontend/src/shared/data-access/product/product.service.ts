import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product, ProductDto } from './interfaces';
import { Observable } from 'rxjs';
import { URL_API } from '../shared';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly apiUrl = inject(URL_API);
  private readonly http = inject(HttpClient);

  createProduct(body: ProductDto): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}products`, body);
  }
}
