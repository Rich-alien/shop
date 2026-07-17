import { Component, input } from '@angular/core';

@Component({
  selector: 'ui-button',
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class UiButton {
  disabled = input(false);
}
