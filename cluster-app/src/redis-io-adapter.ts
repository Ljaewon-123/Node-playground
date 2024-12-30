
import { ServerOptions } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { Cluster } from 'ioredis';
import { INestApplicationContext } from '@nestjs/common';
import { createClient, createCluster } from 'redis';
import { createShardedAdapter } from "@socket.io/redis-adapter";

export class RedisIoAdapter extends IoAdapter {
  private isDev = process.env.NODE_ENV != 'prod'
  private adapterConstructor: ReturnType<typeof createAdapter>;
  private connectDev(){
    if(!this.isDev){
      return (
        createCluster({
          rootNodes: [
            {
              url: "redis://localhost:7000",
            },
            {
              url: "redis://localhost:7001",
            },
            {
              url: "redis://localhost:7002",
            },
          ],
        })
      );
    }
    return createClient({ url: `redis://localhost:6379` });
  }

  async connectToRedis(): Promise<void> {
    const pubClient = this.connectDev()
    const subClient = pubClient.duplicate();

    await Promise.all([pubClient.connect(), subClient.connect()]);

    this.adapterConstructor = createAdapter(pubClient, subClient);
  }

  createIOServer(port: number, options?: ServerOptions): any {
    const server = super.createIOServer(port, options);
    server.adapter(this.adapterConstructor);
    return server;
  }
}
