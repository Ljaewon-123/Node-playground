import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

// 똑같이 하난데 정보가 다른걸로 주냐 다른애들끼리 다른 room을 배정하냐 
// room 이 필요가 없을수도있음 다른룸에 접속해서 room정보를 주는거나
// 그냥 1차적으로 연결해서 payload에 보내는거랑 차이가 없음 
// room은 복잡하기만 할거같은데 
// # #// room이 좀더 복잡할거같으니까 room으로 할까 X
@WebSocketGateway({ namespace: 'socket' })
export class RoomGateway {
  @WebSocketServer() server: Server;

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    console.log(client.id, 'hi', payload);
    return 'Hello world!';
  }
}
