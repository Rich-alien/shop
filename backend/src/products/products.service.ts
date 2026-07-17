import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './models/product.model';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  createProduct(dto: CreateProductDto): Promise<Product> {
    return this.prisma.product.create({ data: dto });
  }

  getAllProduct(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }
}
