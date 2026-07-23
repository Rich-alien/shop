import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Product } from './models/product.model';

@WebSocketGateway({
  // Создай Socket.IO gateway.
  cors: {
    origin: 'http://localhost:4200',
  },
})
export class ProductsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() //даёт нам доступ к серверу, чтобы отправлять события клиентам.
  private server: Server;

  handleConnection(client: Socket, ...args: any[]): void {
    // console.log('Socket connected:', client);
    client.emit('connected', {
      message: 'Connected to products socket',
    });
  }

  handleDisconnect(client: Socket): void {
    // console.log('Socket disconnected:', client);
  }

  notifyProductCreated(product: Product): void {
    this.server.emit('product:created', product);
  }

  notifyProductDeleted(id: string): void {
    this.server.emit('product:deleted', id);
  }

  notifyProductUpdated(product: Product): void {
    this.server.emit('product:updated', product);
  }

  @SubscribeMessage('ping')
  handlePing(client: Socket, @MessageBody() body: { message: string }): void {
    client.emit('ping', body);
  }
}
