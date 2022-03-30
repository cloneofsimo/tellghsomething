import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './utils/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://211.58.102.6:8007',
    credentials: true,
  });
  setupSwagger(app);
  await app.listen(8006);
}
bootstrap();
