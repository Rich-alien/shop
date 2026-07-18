import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:4200',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //Оставляет только поля, описанные в DTO.
      transform: true, //Автоматически превращает данные в нужный тип.
      forbidNonWhitelisted: true, // Не удаляет лишние поля, а сразу возвращает 400 Bad Request.
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
