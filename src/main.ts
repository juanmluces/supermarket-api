import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { CategoriesModule } from './categories/categories.module';
import { ResponseInterceptor } from './common';
import { ProductsModule } from './products/products.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new ResponseInterceptor());

  const config = new DocumentBuilder()
    .setTitle('Supermarket API')
    .setDescription('REST Api for supermarket products by codinglights')
    .setVersion('2.0')
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    include: [ProductsModule, CategoriesModule]
  });
  SwaggerModule.setup('api', app, document, {
    explorer: true,
    swaggerOptions: {
      filter: true,
      showRequestDuration: true
    }
  });

  await app.listen(3000);
}
bootstrap();
