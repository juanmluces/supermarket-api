import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private categoryRepository: Repository<Category>
  ) {}

  async createCategory(category: CreateCategoryDto): Promise<Category> {
    const foundCategory = await this.categoryRepository.findOne({
      where: { name: category.name }
    });
    if (foundCategory) {
      throw new HttpException('Category already exists', HttpStatus.CONFLICT);
    }
    const newCategory = this.categoryRepository.create(category);
    return this.categoryRepository.save(newCategory);
  }

  getCategories(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async getCategory(id: number): Promise<Category> {
    const foundCategory = await this.categoryRepository.findOne({
      where: { id }
    });
    if (!foundCategory) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }
    return foundCategory;
  }

  async deleteCategory(id: number): Promise<{ id: number }> {
    const result = await this.categoryRepository.delete({ id });
    if (result.affected === 0) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }
    return { id };
  }
}
