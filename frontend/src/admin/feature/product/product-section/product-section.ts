import { Component, inject } from '@angular/core';
import { ProductItem } from '../product-item/product-item';
import { loadingStatus, ProductStore } from '@shared/data-access';

@Component({
  selector: 'product-section',
  imports: [ProductItem],
  templateUrl: './product-section.html',
  styleUrl: './product-section.scss',
})
export class ProductSection {
  private readonly productStore = inject(ProductStore);

  protected readonly products = this.productStore.entities;
  protected readonly status = this.productStore.status;
  protected readonly loadingStatus = loadingStatus;

  protected removeProduct(id: string): void {
    this.productStore.removeProduct(id);
  }
}
