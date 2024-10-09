import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { CategoriesModule } from './categories/categories.module';
import { ResponseInterceptor } from './common';
import { createCorsOptions } from './config/cors.config';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.setGlobalPrefix('api');
  app.enableCors(createCorsOptions(app.get(ConfigService)));
  app.getHttpAdapter().get('/', (_, res) => res.redirect('/docs'));
  app.getHttpAdapter().getInstance().disable('x-powered-by');

  const config = new DocumentBuilder()
    .setTitle('Supermarket API')
    .setDescription('REST Api for supermarket products by codinglights')
    .setVersion('2.0')
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    include: [UsersModule, ProductsModule, CategoriesModule]
  });
  SwaggerModule.setup('docs', app, document, {
    explorer: true,
    swaggerOptions: {
      filter: true,
      showRequestDuration: true
    }
  });

  await app.listen(process.env.SERVER_PORT || 3000);
}
bootstrap();
