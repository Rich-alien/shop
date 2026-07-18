import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminCreateProduct } from '../../feature/admin-create-product/admin-create-product';
import { UiButton } from '../../../ui-kit';
import { ProductSection } from '../../feature/product-section/product-section';
import { AdminNavigation } from '../../feature/navigation/navigation';

@Component({
  selector: 'app-admin-shell',
  imports: [RouterOutlet, AdminCreateProduct, UiButton, ProductSection, AdminNavigation],
  templateUrl: './admin-shell.html',
  styleUrl: './admin-shell.scss',
})
export class AdminShell {
  protected logout(): void {}
}
