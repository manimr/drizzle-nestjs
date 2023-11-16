import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(morgan(':method :url :status :response-time ms'));
  await app.listen(3000, () => console.log('Server running on port 3000'));
}
bootstrap();
