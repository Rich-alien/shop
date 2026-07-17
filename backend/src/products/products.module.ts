import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  controllers: [ProductsController],
  providers: [{ provide: ProductsService, useClass: ProductsService }],
})
export class ProductsModule {}
