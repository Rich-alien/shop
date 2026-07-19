import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './models/product.model';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  createProduct(dto: CreateProductDto): Promise<Product> {
    return this.prisma.product.create({ data: dto });
  }

  getAllProduct(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }

  async getProduct(id: string): Promise<Product> {
    const product = await this.prisma.product.findUnique({ where: { uuid: id } });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

 async patchProduct(id: string, data: UpdateProductDto): Promise<Product> {
    try {
      return await this.prisma.product.update({ where: { uuid: id }, data });
    } catch (error) {
      throw new NotFoundException('Product not found');
    }

  }

  async removeProduct(id: string): Promise<Product> {
    // const product = await this.prisma.product.findUnique({ where: { uuid: id } });

    // if (product.ownerId !== user.id) {
    //   throw new ForbiddenException(); // Проверка прав, если вдруг не админ
    // }
    // await fs.unlink(product.imagePath); // Убрать привязку к данным
    try {
      return await this.prisma.product.delete({ where: { uuid: id } });
    } catch (error) {
      throw new NotFoundException('Product not found');
    }
  }
}
