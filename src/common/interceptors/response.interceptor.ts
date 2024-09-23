import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common';
import { Response } from 'express';
import { map, Observable } from 'rxjs';
import { AppResponse } from '../dto/app-response.dto';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((response) => {
        if (response instanceof AppResponse) {
          if (response.statusCode) {
            context
              .switchToHttp()
              .getResponse<Response>()
              .status(response.statusCode);
          } else {
            response.statusCode = context
              .switchToHttp()
              .getResponse<Response>().statusCode;
          }
        }
        return response;
      })
    );
  }
}
