import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './models/product.model';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsGateway } from './products.gateway';

@Injectable()
export class ProductsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly productsGateway: ProductsGateway,
  ) {}

  async createProduct(dto: CreateProductDto): Promise<Product> {
    const product = await this.prisma.product.create({ data: dto });
    this.productsGateway.notifyProductCreated(product);
    return product;
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
      const product = await this.prisma.product.update({ where: { uuid: id }, data });
      this.productsGateway.notifyProductUpdated(product);
      return product;
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
      const product = await this.prisma.product.delete({ where: { uuid: id } });
      this.productsGateway.notifyProductDeleted(product.uuid);
      return product;
    } catch (error) {
      throw new NotFoundException('Product not found');
    }
  }
}
