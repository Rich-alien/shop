import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UiButton } from '@uikit';
import { AdminNavigation } from '@admin/feature';

@Component({
  selector: 'app-admin-shell',
  imports: [RouterOutlet, UiButton, AdminNavigation],
  templateUrl: './admin-shell.html',
  styleUrl: './admin-shell.scss',
})
export class AdminShell {
  protected logout(): void {}
}
