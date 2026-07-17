import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminCreateProduct } from '../../feature/admin-create-product/admin-create-product';
import { UiButton } from '../../../ui-kit';

@Component({
  selector: 'app-admin-shell',
  imports: [RouterOutlet, AdminCreateProduct, UiButton],
  templateUrl: './admin-shell.html',
  styleUrl: './admin-shell.scss',
})
export class AdminShell {
  protected logout(): void {}
}
