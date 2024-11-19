import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ValidationErrorFilter } from './validation-error.filter';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

const corsOptions = {
  // origin: ['http://localhost:3000'],
  // methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ValidationErrorFilter());
  app.enableCors(corsOptions)
  app.useStaticAssets(join(__dirname, '..', 'public'));
  await app.listen(5000);
}

bootstrap();
