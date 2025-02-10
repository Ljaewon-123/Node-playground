import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppClusterService } from './app-cluster.service';
import { RedisIoAdapter } from './redis-io-adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const redisIoAdapter = new RedisIoAdapter(app);
  await redisIoAdapter.connectToRedis();
  app.useWebSocketAdapter(redisIoAdapter);
  await app.listen(process.env.PORT ?? 3000);
}
// bootstrap();
AppClusterService.clusterize(bootstrap);