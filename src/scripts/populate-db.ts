import { NestFactory } from '@nestjs/core';
import * as fs from 'fs/promises';
import * as path from 'path';
import { DataSource } from 'typeorm';
import { AppModule } from '../app.module';
import { Category } from '../categories/entities/category.entity'; // Adjust the path if necessary
import { Product } from '../products/entities/product.entity';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const dataSource = app.get(DataSource);
  const categoryRepository = dataSource.getRepository(Category);
  const productsRepository = dataSource.getRepository(Product);

  const categoriesData = await fs.readFile(
    path.join(__dirname, '../data', 'categories.json'),
    'utf8'
  );
  const categories = JSON.parse(categoriesData);

  for (const category of categories) {
    const foundCategory = await categoryRepository.findOne({
      where: { name: category.name }
    });
    if (foundCategory) {
      continue;
    }
    const newCategory = categoryRepository.create(category);
    await categoryRepository.save(newCategory);
  }

  const productsData = await fs.readFile(
    path.join(__dirname, '../data', 'products.json'),
    'utf8'
  );
  const products = JSON.parse(productsData);

  for (const product of products) {
    const foundCategory = await categoryRepository.findOne({
      where: { name: product.categoryName }
    });
    if (!foundCategory) {
      continue;
    }
    const foundProduct = await productsRepository.findOne({
      where: { name: product.name }
    });

    if (foundProduct) {
      continue;
    }
    const newProduct = productsRepository.create({
      ...product,
      category: foundCategory
    });
    await productsRepository.save(newProduct);
  }

  await app.close();
}
bootstrap().catch((error) => {
  console.error('Error populating categories:', error);
  process.exit(1);
});
