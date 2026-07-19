import { Component, input, output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Product } from '@shared/data-access';

@Component({
  selector: 'product-item',
  imports: [DatePipe],
  templateUrl: './product-item.html',
  styleUrl: './product-item.scss',
})
export class ProductItem {
  uuid = input<string>();
  name = input.required<string>();
  description = input.required<string>();
  price = input.required<number>();
  createdAt = input.required<Product['createdAt']>();

  remove = output<void>();
  openItem = output<void>();

  protected openCard(): void {
    return this.openItem.emit();
  }

  protected removeCard(event: MouseEvent): void {
    event.stopPropagation();
    return this.remove.emit();
  }
}
