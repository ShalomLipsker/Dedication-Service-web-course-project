import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import { AppModule } from './app.module';
import { mainLogger } from './logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: mainLogger,
  });
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
  app.use(helmet());

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT);
}

bootstrap();
