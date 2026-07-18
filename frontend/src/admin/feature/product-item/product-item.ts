import { Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Product } from '../../../shared/data-access/product/interfaces';

@Component({
  selector: 'product-item',
  imports: [DatePipe],
  templateUrl: './product-item.html',
  styleUrl: './product-item.scss',
})
export class ProductItem {
  uuid = input<string>();
  name = input.required<string>();
  description = input.required<string>();
  price = input.required<number>();
  createdAt = input.required<Product['createdAt']>();
}
