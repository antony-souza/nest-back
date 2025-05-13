import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { environment } from './environment/environment.dev';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  await app.listen(environment.port);
  Logger.debug(`${environment.host}:${environment.port}`, 'Bootstrap');
}

bootstrap().catch((err) => {
  Logger.error('Error starting the application:', err);
});
