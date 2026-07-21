import { Component } from '@angular/core';
import { PublicHeader } from '../../feature';
import { RouterOutlet } from '@angular/router';
import { PublicFooter } from '../../feature';

@Component({
  selector: 'public-shell',
  imports: [PublicHeader, RouterOutlet, PublicFooter],
  templateUrl: './public-shell.html',
  styleUrl: './public-shell.scss',
})
export class PublicShell {}
