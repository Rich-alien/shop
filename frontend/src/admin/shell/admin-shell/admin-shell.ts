import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminCreateProduct } from '../../feature/admin-create-product/admin-create-product';
import { UiButton } from '../../../ui-kit';
import { ProductItem } from '../../feature/product-item/product-item';
import { ProductService } from '../../../shared/data-access';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-admin-shell',
  imports: [RouterOutlet, AdminCreateProduct, UiButton, ProductItem, AsyncPipe],
  templateUrl: './admin-shell.html',
  styleUrl: './admin-shell.scss',
})
export class AdminShell {
  private readonly productService = inject(ProductService);

  readonly products$ = this.productService.getAllProduct();

  protected logout(): void {}
}
