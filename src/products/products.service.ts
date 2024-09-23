import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoriesService } from '../categories/categories.service';
import { AppPagination } from '../common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductDto } from './dto/product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    private categoryService: CategoriesService
  ) {}
  async createProduct(product: CreateProductDto): Promise<ProductDto> {
    const foundCategory = await this.categoryService.getCategory(
      product.categoryId
    );
    if (!foundCategory) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }
    const foundProduct = await this.productRepository.findOne({
      where: { name: product.name }
    });
    if (foundProduct) {
      throw new HttpException('Product already exists', HttpStatus.CONFLICT);
    }
    const newProduct = this.productRepository.create({
      ...product,
      category: foundCategory
    });
    const savedProduct = await this.productRepository.save(newProduct);
    return new ProductDto(savedProduct);
  }

  async getProducts(
    page: number = 1,
    pageSize: number = 10,
    category: string
  ): Promise<{ data: ProductDto[]; pagination: AppPagination }> {
    const queryBuilder = this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .skip((page - 1) * pageSize)
      .take(pageSize);

    if (category) {
      queryBuilder.where('category.name = :category', { category });
    }
    const [data, total] = await queryBuilder.getManyAndCount();
    const products = data.map((entity) => new ProductDto(entity));
    return {
      data: products,
      pagination: new AppPagination(page, pageSize, total)
    };
  }

  async deleteProduct(id: number): Promise<{ id: number }> {
    const result = await this.productRepository.delete({ id });
    if (result.affected === 0) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    return { id };
  }
}
