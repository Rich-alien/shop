import { Component, input } from '@angular/core';

@Component({
  selector: 'ui-button',
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class UiButton {
  type = input<'button' | 'submit' | 'reset'>('button');
  disabled = input(false);
}
