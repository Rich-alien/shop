import { Component, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SocketService } from '@shared/data-access';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnDestroy {
  constructor(private socketService: SocketService) {
    this.socketService.connect();
  }

  ngOnDestroy() {
    this.socketService.disconnect();
  }
}
