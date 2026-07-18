import { Component } from '@angular/core';
import { AdminCreateProduct } from '../admin-create-product/admin-create-product';
import { ProductSection } from './product-section/product-section';

@Component({
  selector: 'admin-product',
  imports: [AdminCreateProduct, ProductSection],
  templateUrl: './product.html',
  styleUrl: './product.scss',
})
export class AdminProduct {}
