import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'shared-product',
  imports: [],
  templateUrl: './product.html',
  styleUrl: './product.scss',
})
export class ProductComponent {
  readonly toggleAddToBasket = signal(false); /*TODO = kill me father*/
  readonly isOnBasket = computed(() => this.toggleAddToBasket()); //read product!

  protected addToCart(): void {
    this.toggleAddToBasket.set(true);
  }
}
