import { Component, DestroyRef } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../../shared/data-access';
import { ProductDto } from '../../../shared/data-access/product/interfaces';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UiButton } from '../../../ui-kit';

@Component({
  selector: 'admin-create-product',
  imports: [ReactiveFormsModule, UiButton],
  templateUrl: './admin-create-product.html',
  styleUrl: './admin-create-product.scss',
})
export class AdminCreateProduct {
  readonly productForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    price: new FormControl(0),
  });

  constructor(
    private productService: ProductService,
    private destroyRef: DestroyRef,
  ) {}

  create(): void {
    this.productService
      .createProduct(this.productForm.value as ProductDto)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }
}
