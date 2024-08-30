import { ApiProperty } from '@nestjs/swagger';

export class AddProductToMenuDto {
  @ApiProperty()
  productId: string;

  @ApiProperty()
  menuId: string;
}

export class CreateProductRequestDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty({ nullable: true })
  images: string;

  @ApiProperty({ nullable: true })
  basePrice: number;

  @ApiProperty({ nullable: true })
  toppings: string[];
}

export class DeleteProductDto {
  @ApiProperty()
  id: string;
}

export class SearchProductDto {
  @ApiProperty()
  name: string;
}

export class UpdateProductRequestDto {
  @ApiProperty()
  id: string;

  @ApiProperty({ nullable: true })
  name: string;

  @ApiProperty({ nullable: true })
  description: string;

  @ApiProperty({ nullable: true })
  images: string;

  @ApiProperty({ nullable: true })
  basePrice: number;

  @ApiProperty({ nullable: true, default: [] })
  toppings: string[];
}