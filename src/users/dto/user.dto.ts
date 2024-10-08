import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class UserDto {
  @ApiProperty({ example: 1, description: 'Id of user' })
  id: number;

  @ApiProperty({
    example: 'example.email.com',
    description: 'The email of the user'
  })
  email: string;

  @ApiProperty({ example: '123456', description: 'The API key of the user' })
  apiKey?: string;

  @ApiProperty({
    example: '2023-01-01T00:00:00Z',
    description: 'The creation date of the category'
  })
  createdAt: string;
  constructor(userEntity: User) {
    this.id = userEntity.id;
    this.email = userEntity.email;
    this.apiKey = userEntity.apiKey;
  }
}
