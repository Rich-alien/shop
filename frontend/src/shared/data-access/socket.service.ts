import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class SocketService {
  private readonly socket = io('http://localhost:3000');

  connect(): void {
    if (!this.socket.connected) {
      this.socket.connect();
    }
  }

  on<T>(event: string ): Observable<T> {
    return new Observable<T>((subscriber) => {
      const handler = (data: T): void => {
        subscriber.next(data);
      };

      this.socket.on(event, handler);

      return () => {
        this.socket.off(event, handler);
      };
    });
  }

  emit<T>(event: string, payload: T): void {
    this.socket.emit(event, payload);
  }

  disconnect(): void {
    this.socket.disconnect();
  }
}
