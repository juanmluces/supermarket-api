import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailService } from 'src/email/email.service';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly emailService: EmailService
  ) {}

  async register(createUserDto: CreateUserDto): Promise<UserDto> {
    const { email } = createUserDto;

    const existingUser = await this.userRepository.findOne({
      where: { email }
    });

    if (existingUser) {
      throw new HttpException('Email already registered', HttpStatus.CONFLICT);
    }

    const apiKey = uuid();
    const user = this.userRepository.create({ email, apiKey });
    const savedUser = await this.userRepository.save(user);
    await this.emailService.sendRegister({ email, apiKey });
    return new UserDto(savedUser);
  }

  async findByEmail(email: string): Promise<UserDto> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    await this.emailService.sendRegister({
      email: user.email,
      apiKey: user.apiKey
    });

    return new UserDto(user);
  }

  async getAllUsers(): Promise<UserDto[]> {
    const users = await this.userRepository.find({
      select: ['id', 'email', 'createdAt']
    });
    return users.map((user) => new UserDto(user));
  }

  async deleteEmail(email: string): Promise<{ email: string }> {
    const result = await this.userRepository.delete({ email });
    if (result.affected === 0) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return { email };
  }
}
