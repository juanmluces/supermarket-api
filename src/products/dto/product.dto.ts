import { ApiProperty } from '@nestjs/swagger';
import { CategoryDto } from 'src/categories/dto/category.dto';
import { Product } from '../entities/product.entity';

export class ProductDto {
  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the product'
  })
  id: number;

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

  @ApiProperty({
    example: '2023-01-01T00:00:00Z',
    description: 'The creation date of the product'
  })
  createdAt: string;

  @ApiProperty({
    example: '2023-01-01T00:00:00Z',
    description: 'The last update date of the product'
  })
  updatedAt: string;

  @ApiProperty({
    type: () => CategoryDto,
    description: 'The category of the product'
  })
  category: CategoryDto;
  constructor(entity: Product) {
    this.id = entity.id;
    this.brand = entity.brand;
    this.name = entity.name;
    this.imagen = entity.imagen;
    this.price = entity.price;
    this.description = entity.description;
    this.createdAt = entity.createdAt.toISOString();
    this.updatedAt = entity.updatedAt.toISOString();
    this.category = new CategoryDto(entity.category);
  }
}
