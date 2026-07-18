import { IsNumber, IsString, Min } from 'class-validator';

export class CreateProductDto {
  @IsString()
  readonly name!: string;

  @IsNumber()
  @Min(0)
  readonly price: number = 0;

  @IsString()
  readonly description: string = '';
}
