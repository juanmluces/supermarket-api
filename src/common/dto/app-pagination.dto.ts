import { ApiProperty } from '@nestjs/swagger';

export class AppPagination {
  @ApiProperty({ example: 1, description: 'Current page number' })
  page: number;

  @ApiProperty({ example: 10, description: 'Number of items per page' })
  pageSize: number;

  @ApiProperty({ example: 5, description: 'Total number of pages' })
  totalPages: number;

  @ApiProperty({
    example: 2,
    description: 'Next page number',
    required: false,
    nullable: true
  })
  nextPage: number | null;

  @ApiProperty({ example: 50, description: 'Total number of elements' })
  totalElements: number;

  constructor(page: number, pageSize: number, totalElements: number) {
    this.page = page;
    this.pageSize = pageSize;
    this.totalElements = totalElements;
    this.totalPages = Math.ceil(totalElements / pageSize);
    this.nextPage = page < this.totalPages ? page + 1 : null;
  }
}
