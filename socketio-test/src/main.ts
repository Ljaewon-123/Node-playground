import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RedisIoAdapter } from './redis-io-adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:5173'],
    credentials: true
  });
  // const redisIoAdapter = new RedisIoAdapter(app);
  app.useWebSocketAdapter(new RedisIoAdapter(app))
  // await redisIoAdapter.connectToRedis();
  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
