import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductsGateway } from './products.gateway';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, ProductsGateway],
})
export class ProductsModule {}
