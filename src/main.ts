import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  app.use(helmet())
  app.use(helmet.noSniff())
  app.use(helmet.hidePoweredBy())
  app.use(helmet.contentSecurityPolicy())
  const config = new DocumentBuilder()
    .setTitle("Ecommerce Test API")
    .setDescription("This is an assessment task")
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('ecommerce')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1', app, documentFactory, {
    jsonDocumentUrl: 'swagger/json'
  });

  app.setGlobalPrefix('api/v1')
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
