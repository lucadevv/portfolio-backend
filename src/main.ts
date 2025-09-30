import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function main() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1')
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Elimina propiedades no definidas en el DTO
    forbidNonWhitelisted: true, // Lanza error si hay propiedades extra
    transform: true, // Transforma los tipos automáticamente
    transformOptions: {
        enableImplicitConversion: true, // Convierte tipos implícitamente
    },
  }))
  await app.listen(process.env.PORT ?? 3000);
  const url =await app.getUrl();
  console.log(url);
  
}
main();
