import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.query.apiKey;

    if (!apiKey) {
      throw new UnauthorizedException('API key is missing');
    }

    const user = await this.userRepository.findOne({ where: { apiKey } });

    if (!user) {
      throw new UnauthorizedException('Invalid API key');
    }

    // Attach user to request object for further use
    request.user = user;

    return true;
  }
}
