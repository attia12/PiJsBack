/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as Sentry from '@sentry/node';




async function bootstrap() {
  Sentry.init({
    dsn: 'https://6e19e3606bc22ed8c12262134c9885cc@o4507170025701376.ingest.de.sentry.io/4507170038087760',
    debug: true, 
    integrations: [
      new Sentry.Integrations.Console({
        level: 0,
      }),
    ],
  });
  
  
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  // const reflector=new Reflector();
  // app.useGlobalGuards(new AtGuard(reflector));
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
