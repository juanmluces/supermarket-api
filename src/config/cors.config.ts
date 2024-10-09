import { HttpException, HttpStatus } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ConfigService } from '@nestjs/config';

export const createCorsOptions = (
  configService: ConfigService
): CorsOptions => {
  const acceptedOrigins = configService
    .get<string>('ACCEPTED_ORIGINS')
    .split(',');

  return {
    origin: (origin, callback) => {
      if (
        !origin ||
        acceptedOrigins.includes(origin) ||
        acceptedOrigins.includes('*')
      ) {
        return callback(null, true);
      }
      return callback(
        new HttpException('Not allowed by CORS', HttpStatus.FORBIDDEN),
        false
      );
    }
  };
};
