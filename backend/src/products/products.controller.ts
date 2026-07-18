import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import type { Product } from './models/product.model';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() dto: CreateProductDto): Promise<Product> {
    return this.productsService.createProduct(dto);
  }

  @Get()
  findAll(): Promise<Product[]> {
    return this.productsService.getAllProduct();
  }

  @Get(':productId')
  findOne(@Param('productId') productId: string): Promise<Product> {
    return this.productsService.getProduct(productId);
  }

  @Patch(':productId')
  update(@Param('productId') productId: string, @Body() dto: UpdateProductDto): Promise<Product> {
    return this.productsService.patchProduct(productId, dto);
  }

  @Delete(':productId')
  remove(@Param('productId') productId: string): Promise<Product> {
    return this.productsService.removeProduct(productId);
  }

  @Get(':search')
  search(@Param('search') search: string): Product[] {
    return [];
  }
}
