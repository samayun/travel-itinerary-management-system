import config from '@config';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import loadSwaggerModule from '@loaders/swagger.module';
import { HttpExceptionFilter } from '@shared/errors/notfound';
import { loadGlobalMiddlewares } from '@loaders/middlewares.loader';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  loadGlobalMiddlewares(app);

  app.setGlobalPrefix(config.api.globalPrefix);

  app.useGlobalPipes(new ValidationPipe());

  app.useGlobalFilters(new HttpExceptionFilter());

  if (process.env.NODE_ENV === 'development') loadSwaggerModule(app);

  await app.listen(config.server.port);

  console.info(
    '\x1b[47m\x1b[46m%s\x1b[0m',
    `🧠 Server running on 👀  `,
    '\x1b[1m\x1b[5m',
    `${config.server.host}:${config.server.port} ‍🔥🚀`,
  );
}
bootstrap();
