import { Component } from '@angular/core';
import { CatalogList } from '../../feature/catalog-list/catalog-list';

@Component({
  selector: 'app-home-shell',
  imports: [CatalogList],
  templateUrl: './home-shell.html',
  styleUrl: './home-shell.scss',
})
export class HomeShell {}
