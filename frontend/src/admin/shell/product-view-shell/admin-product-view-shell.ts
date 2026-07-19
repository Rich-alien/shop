import { Component } from '@angular/core';
import { AdminProduct } from '@admin/feature';

@Component({
  selector: 'admin-product-view-shell',
  template: '<admin-product></admin-product>',
  imports: [AdminProduct],
})
export class AdminProductViewShell {}
