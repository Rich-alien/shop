import { Component, inject } from '@angular/core';
import { ProductItem } from '../product-item/product-item';
import { ProductStore } from '@shared/data-access';

@Component({
  selector: 'product-section',
  imports: [ProductItem],
  templateUrl: './product-section.html',
  styleUrl: './product-section.scss',
})
export class ProductSection {
  private readonly productStore = inject(ProductStore);

  readonly products = this.productStore.entities;

  protected removeProduct(id: string): void {
    this.productStore.removeProduct(id);
  }
}
