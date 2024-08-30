import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';
import { ConfigService } from '@nestjs/config';
import { INestApplicationContext } from '@nestjs/common';

export class RedisIoAdapter extends IoAdapter {
  constructor(
    private app: INestApplicationContext,
  ){
    super(app);
  }

  // redis pub, sub으로 확장하는거 같은데 
  // private adapterConstructor: ReturnType<typeof createAdapter>;

  // async connectToRedis(): Promise<void> {
  //   const pubClient = createClient({ url: `redis://localhost:6379` });
  //   const subClient = pubClient.duplicate();

  //   await Promise.all([pubClient.connect(), subClient.connect()]);

  //   this.adapterConstructor = createAdapter(pubClient, subClient);
  // }

  createIOServer(port: number, options?: ServerOptions): any {
    // const origins = this.configService.get<string>('SOCKET_URL')
    // const origin = origins.split(',')
    options.cors = { origin: ['http://localhost:5173'] }
    const server = super.createIOServer(port, options);
    // server.adapter(this.adapterConstructor);
    return server;
  }
}
