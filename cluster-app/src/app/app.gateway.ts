import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway()
export class AppGateway {
  handleDisconnect(client: Socket) {
    console.log(`Client Disconnected : ${client.id}`);
  }
  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Client Connected : ${client.id}, Room Name: ${client.handshake.query.roomName}`);
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: string): void  {
    client.emit('replyMessage', {
      message: payload,
      replyMessage: `reply message from worker with process.pid:
      ${process.pid}`,
    });
  }
}
