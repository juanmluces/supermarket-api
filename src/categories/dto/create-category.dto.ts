import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Congelados', description: 'Nombre de la categoría' })
  name: string;

  @ApiProperty({
    example: 'https://sample-image.jpg',
    description: 'Imagen de la categoría'
  })
  image: string;
}
