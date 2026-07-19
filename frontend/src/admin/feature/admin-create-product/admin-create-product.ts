import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductStore } from '@shared/data-access';
import { UiButton, UiInput } from '@uikit';

@Component({
  selector: 'admin-create-product',
  imports: [ReactiveFormsModule, UiInput, UiButton],
  templateUrl: './admin-create-product.html',
  styleUrl: './admin-create-product.scss',
})
export class AdminCreateProduct {
  private readonly productStore = inject(ProductStore);

  readonly form: FormGroup<{
    name: FormControl<string>;
    description: FormControl<string>;
    price: FormControl<number>;
  }> = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    description: new FormControl('', { nonNullable: true }),
    price: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(0)],
    }),
  });

  create(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.productStore.createProduct(this.form.getRawValue());
  }
}
