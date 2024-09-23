import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'Apple', description: 'The brand of the product' })
  brand: string;

  @ApiProperty({ example: 'iPhone 12', description: 'The name of the product' })
  name: string;

  @ApiProperty({
    example: 'https://example.com/image.jpg',
    description: 'The image URL of the product',
    required: false
  })
  imagen?: string;

  @ApiProperty({ example: 99.99, description: 'The price of the product' })
  price: number;

  @ApiProperty({
    example: 'A high-end smartphone',
    description: 'The description of the product'
  })
  description: string;

  @ApiProperty({ example: 1, description: 'The ID of the category' })
  categoryId: number;
}
