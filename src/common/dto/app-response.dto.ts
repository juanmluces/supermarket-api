import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { AppPagination } from './app-pagination.dto';

export class AppResponse<T> {
  @ApiProperty({
    example: true,
    description: 'Indicates if the response is successful'
  })
  success: boolean;

  @ApiProperty({
    example: 'Operation successful',
    description: 'Response message'
  })
  message: string;

  data?: T;

  @ApiProperty({
    description: 'Pagination information',
    required: false,
    type: () => AppPagination
  })
  pagination?: AppPagination;

  @ApiProperty({
    example: 200,
    description: 'HTTP status code',
    required: true
  })
  statusCode?: HttpStatus;

  constructor({
    success = true,
    message = '',
    data = undefined,
    pagination = undefined,
    statusCode = undefined
  }: AppResponseParams<T> = {}) {
    this.success = success;
    this.message = message;
    if (!this.message) {
      this.message = success ? 'Success' : 'Failed';
    }
    this.data = data;
    this.pagination = pagination;
    this.statusCode = statusCode;
  }
}

type AppResponseParams<t> = {
  success?: boolean;
  message?: string;
  data?: t | undefined;
  pagination?: AppPagination;
  statusCode?: HttpStatus;
};
