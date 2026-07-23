import { Component } from '@angular/core';
import { ProductComponent } from '../../../shared/feature';

@Component({
  selector: 'home-catalog-list',
  imports: [ProductComponent],
  templateUrl: './catalog-list.html',
  styleUrl: './catalog-list.scss',
})
export class CatalogList {
}
