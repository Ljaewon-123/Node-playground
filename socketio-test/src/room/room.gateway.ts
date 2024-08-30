import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

// 똑같이 하난데 정보가 다른걸로 주냐 다른애들끼리 다른 room을 배정하냐 
// room이 좀더 복잡할거같으니까 room으로 할까 
@WebSocketGateway({ namespace: 'socket' })
export class RoomGateway {
  @WebSocketServer() server: Server;

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    console.log(client.id, 'hi', payload);
    return 'Hello world!';
  }
}
