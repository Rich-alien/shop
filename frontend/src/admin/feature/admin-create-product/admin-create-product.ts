import { Component, DestroyRef } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UiInput, UiButton } from '@uikit';
import { ProductService } from '@shared/data-access';
import { ProductDto } from '@shared/data-access';

@Component({
  selector: 'admin-create-product',
  imports: [ReactiveFormsModule, UiButton, UiInput],
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
