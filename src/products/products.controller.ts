import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags
} from '@nestjs/swagger';
import {
  ApiOkResponseCustomProperties,
  ApiOkResponseList,
  ApiOkResponseSingle,
  AppResponse
} from '../common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductDto } from './dto/product.dto';
import { ProductsService } from './products.service';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'Get a list of all products' })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number'
  })
  @ApiQuery({
    name: 'pageSize',
    required: false,
    type: Number,
    description: 'Number of items per page'
  })
  @ApiQuery({
    name: 'category',
    required: false,
    type: String,
    description: 'Category name'
  })
  @ApiOkResponseList(ProductDto)
  async getProducts(
    @Query('page', new ParseIntPipe({ optional: true })) page: number = 1,
    @Query('pageSize', new ParseIntPipe({ optional: true }))
    pageSize: number = 10,
    @Query('category') category?: string
  ) {
    const { data, pagination } = await this.productsService.getProducts(
      page,
      pageSize,
      category
    );
    return new AppResponse({
      data,
      pagination
    });
  }

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiBody({ type: CreateProductDto })
  @ApiOkResponseSingle(ProductDto)
  async createProduct(@Body() createProductDto: CreateProductDto) {
    const product = await this.productsService.createProduct(createProductDto);
    return new AppResponse({
      data: product,
      message: 'Product created successfully'
    });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product by ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'The ID of the product to delete'
  })
  @ApiOkResponseCustomProperties({
    id: { type: 'number', description: 'Id of deleted product' }
  })
  async deleteProduct(@Param('id', ParseIntPipe) id: number) {
    const response = await this.productsService.deleteProduct(id);
    return new AppResponse({
      data: response,
      message: 'Product deleted successfully'
    });
  }
}
