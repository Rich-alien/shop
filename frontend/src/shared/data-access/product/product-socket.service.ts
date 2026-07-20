import { inject, Injectable } from '@angular/core';
import { Product } from './interfaces';
import { SocketService } from '../socket.service';
import { Observable } from 'rxjs';

@Injectable()
export class ProductSocketService {
  private readonly socketService = inject(SocketService);

  onProductCreated(): Observable<Product> {
    return this.socketService.on<Product>('product:created');
  }

  onProductDeleted(): Observable<string> {
    return this.socketService.on<string>('product:deleted');
  }

  onProductUpdated(): Observable<Product> {
    return this.socketService.on<Product>('product:updated');
  }
}
