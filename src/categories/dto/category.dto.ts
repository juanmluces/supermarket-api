import { ApiProperty } from '@nestjs/swagger';
import { Category } from '../entities/category.entity';

export class CategoryDto {
  @ApiProperty({ example: 1, description: 'Id of category' })
  id: number;

  @ApiProperty({ example: 'Congelados', description: 'Nombre de la categoría' })
  name: string;

  @ApiProperty({
    example: 'https://sample-image.jpg',
    description: 'Imagen de la categoría'
  })
  image: string;

  @ApiProperty({
    example: '2023-01-01T00:00:00Z',
    description: 'The creation date of the category'
  })
  createdAt: string;

  @ApiProperty({
    example: '2023-01-01T00:00:00Z',
    description: 'The last update date of the category'
  })
  updatedAt: string;

  constructor(entity: Category) {
    this.id = entity.id;
    this.name = entity.name;
    this.image = entity.image;
    this.createdAt = entity.createdAt.toISOString();
    this.updatedAt = entity.updatedAt.toISOString();
  }
}
