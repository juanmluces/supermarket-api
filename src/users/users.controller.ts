import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  ValidationPipe
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import {
  ApiOkResponseCustomProperties,
  ApiOkResponseList,
  ApiOkResponseSingle,
  AppResponse
} from 'src/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Get a list of all registered users' })
  @ApiOkResponseList(UserDto)
  async getAll(): Promise<AppResponse<UserDto[]>> {
    const users = await this.usersService.getAllUsers();
    return new AppResponse({ data: users });
  }

  @Get(':email')
  @ApiOperation({ summary: 'Get a user by email' })
  @ApiOkResponseSingle(UserDto)
  async getByEmail(
    @Param('email') email: string
  ): Promise<AppResponse<UserDto>> {
    const user = await this.usersService.findByEmail(email);
    return new AppResponse({ data: user });
  }

  @Post()
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: CreateUserDto })
  @ApiOkResponseSingle(UserDto)
  async register(
    @Body(new ValidationPipe()) createUserDto: CreateUserDto
  ): Promise<AppResponse<UserDto>> {
    const registeredUser = await this.usersService.register(createUserDto);
    return new AppResponse({ data: registeredUser });
  }

  @Delete(':email')
  @ApiOperation({ summary: 'Delete a user by email' })
  @ApiParam({
    name: 'email',
    type: String,
    description: 'The email of the user to delete'
  })
  @ApiOkResponseCustomProperties({
    email: { type: 'string', description: 'email of deleted user' }
  })
  async deleteUser(
    @Param('email') email: string
  ): Promise<AppResponse<{ email: string }>> {
    const deletedEmail = await this.usersService.deleteEmail(email);
    return new AppResponse({ data: deletedEmail });
  }
}
