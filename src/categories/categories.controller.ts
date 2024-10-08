import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards
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
import { CategoriesService } from './categories.service';
// import { CategoryDto } from './dto/category-simple.dto';
import { ApiKeyGuard } from 'src/auth/guards/api-key/api-key.guard';
import { CategoryDto } from './dto/category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';

@ApiTags('Categories')
@Controller('categories')
@UseGuards(ApiKeyGuard)
@ApiQuery({
  name: 'apiKey',
  type: String,
  required: true,
  description: 'API key for authentication'
})
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @ApiOperation({ summary: 'Get a list of all categories' })
  @ApiOkResponseList(CategoryDto)
  async getCategories() {
    const categories = await this.categoriesService.getCategories();
    return new AppResponse<CategoryDto[]>({
      data: categories.map((entity) => new CategoryDto(entity))
    });
  }

  @Post()
  @ApiOperation({ summary: 'Create a new category' })
  @ApiBody({ type: CreateCategoryDto })
  @ApiOkResponseSingle(CategoryDto)
  async createCategory(@Body() categoryDto: CreateCategoryDto) {
    const entity = await this.categoriesService.createCategory(categoryDto);
    return new AppResponse<CategoryDto>({
      data: new CategoryDto(entity),
      message: 'Category created successfully'
    });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a category by ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'The ID of the category to delete'
  })
  @ApiOkResponseCustomProperties({
    id: { type: 'number', description: 'Id of deleted category' }
  })
  async deleteCategory(@Param('id', ParseIntPipe) id: number) {
    const response = await this.categoriesService.deleteCategory(id);
    return new AppResponse({
      data: response,
      message: 'Category deleted successfully'
    });
  }
}
