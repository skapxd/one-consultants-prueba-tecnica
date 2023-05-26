import {
  Logger,
  PreconditionFailedException,
  ValidationPipe,
} from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger/dist';
import { ValidationError } from 'class-validator';

import { AllExceptionsHandler } from './AllExceptionsHandler/AllExceptionsHandler';
import { AppModule } from './app.module';

const { SwaggerTheme } = require('swagger-themes');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger();

  const theme = new SwaggerTheme('v3');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        throw new PreconditionFailedException(validationErrors);
      },
    }),
  );

  const httpRef = app.get(HttpAdapterHost);
  app.useGlobalFilters(
    new AllExceptionsHandler(httpRef.httpAdapter.getHttpServer(), logger),
  );

  app.enableCors({ origin: '*' });

  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();

  const document = SwaggerModule.createDocument(app, config, {});

  const optionsV1 = {
    explorer: true,
    customCss: theme.getBuffer('dark'),
  };

  SwaggerModule.setup('api', app, document, optionsV1);

  await app.listen(process.env.PORT);
  logger.log(`Server is running in ${await app.getUrl()}`);
}
bootstrap();
