import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductDto, ProductStore } from '@shared/data-access';
import { UiButton, UiInput } from '@uikit';

@Component({
  selector: 'admin-create-product',
  imports: [ReactiveFormsModule, UiInput, UiButton],
  templateUrl: './admin-create-product.html',
  styleUrl: './admin-create-product.scss',
})
export class AdminCreateProduct {
  private readonly productStore = inject(ProductStore);

  readonly productForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    price: new FormControl(0),
  });

  create(): void {
    this.productStore.createProduct(this.productForm.value as ProductDto);
  }
}
