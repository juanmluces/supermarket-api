import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { CategoriesModule } from '../categories/categories.module';
import { Product } from './entities/product.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, User]), CategoriesModule],
  providers: [ProductsService],
  controllers: [ProductsController]
})
export class ProductsModule {}
