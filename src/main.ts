import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = process.env.PORT || 3000;

  app.setGlobalPrefix('api');

  app.useGlobalPipes(new ValidationPipe({
    skipMissingProperties: true,
    forbidNonWhitelisted: false,
    whitelist: true,
    transform: true,
  }))

  const config = new DocumentBuilder()
    .setTitle('Reserva de vehículos.')
    .setDescription('Api para la reserva de vehículos.')
    .setVersion('1.0')
    .addTag('Cars')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  app.enableCors({
    origin: '*',
  });

  await app.listen(port, () => {
    console.log("El servidor está inicializado en el puerto " + port);
  });
}
bootstrap();
