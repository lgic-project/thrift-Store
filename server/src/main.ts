import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Thrift-It Api')
    .setDescription('The Thrift-It api description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  const corsOptions: CorsOptions = {
    allowedHeaders: [
      'origin',
      'x-requested-with',
      'content-type',
      'accept',
      'authorization',
    ],
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
    origin: ['http://localhost:3001', 'http://localhost:3000','exp://192.168.1.67:8081','http://localhost:8081'],
  };
  app.enableCors(corsOptions);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(8000);
}
bootstrap();
