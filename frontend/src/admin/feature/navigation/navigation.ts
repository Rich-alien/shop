import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'admin-navigation',
  templateUrl: './navigation.html',
  styleUrl: './navigation.scss',
  imports: [RouterLink],
})
export class AdminNavigation {}
