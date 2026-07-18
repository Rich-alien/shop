import { Component } from '@angular/core';
import { AdminProduct } from '../../feature/product/product';

@Component({
  selector: 'admin-product-view-shell',
  template: '<admin-product></admin-product>',
  imports: [AdminProduct],
})
export class AdminProductViewShell {}
