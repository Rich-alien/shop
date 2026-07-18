import { Component, inject } from '@angular/core';
import { ProductItem } from '../product-item/product-item';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductService } from '../../../../shared/data-access';

@Component({
  selector: 'product-section',
  imports: [ProductItem],
  templateUrl: './product-section.html',
  styleUrl: './product-section.scss',
})
export class ProductSection {
  private readonly productService = inject(ProductService);

  readonly products = toSignal(this.productService.getAllProduct(), { initialValue: [] });
}
