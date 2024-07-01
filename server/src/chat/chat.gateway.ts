import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { Server, Socket } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { CreateChatMessageDto } from './dto/createChatMessage.dto';
import { GetCurrentUserId } from 'src/common/decorators';
import { AtGuard } from 'src/common/guards';
import { JwtService } from '@nestjs/jwt';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly chatService: ChatService,
    private readonly jwtService: JwtService,
  ) {}

  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket: Socket) => {
      console.log(`${socket.id} connected`);
      console.log('Handshake Headers:', socket.handshake.headers);
      console.log('Handshake Auth:', socket.handshake.auth);
    });
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
    const userId = this.getUserIdFromSocket(client);
    if (userId) {
      client.join(userId);
    }
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    const userId = this.getUserIdFromSocket(client);
    if (userId) {
      client.leave(userId);
    }
  }

  @UseGuards(AtGuard)
  @SubscribeMessage('message')
  async handleMessage(
    @MessageBody() body: CreateChatMessageDto,
    @GetCurrentUserId() userId: string,
  ) {
    try {
      body.senderId = userId;
      const message = await this.chatService.create(body);
      this.server.to(body.receiverId).emit('message', message);
    } catch (error) {
      console.error('Error handling message:', error);
      this.server.to(userId).emit('error', 'Message could not be delivered');
    }
  }

  private getUserIdFromSocket(socket: Socket): string {
    const token = socket.handshake.headers['authorization']?.split(' ')[1];
    if (!token) {
      console.error('No token provided in handshake headers');
      return null;
    }
    try {
      console.log('Token received:', token);
      const payload = this.jwtService.verify(token, { secret: 'your_hardcoded_secret_key' });  // Use the same hardcoded secret key
      console.log('Token payload:', payload);
      return payload.userId;
    } catch (error) {
      console.error('Error verifying token:', error);
      return null;
    }
  }
}
