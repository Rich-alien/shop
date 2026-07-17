export interface Product {
  uuid: string;
  name: string;
  price: number;
  description: string;
  createdAt: Date;
}

export type ProductDto = Pick<Product, 'name' | 'description' | 'price'>;
