import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateChatMessageDto } from './dto/createChatMessage.dto';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateChatMessageDto) {
    const receiver = await this.prisma.user.findUnique({
      where: { id: dto.receiverId },
      select: {
        id: true,
        email: true,
        Profile: {
          select: {
            name: true,
            username: true,
          },
        },
      },
    });

    if (!receiver) {
      throw new NotFoundException('Receiver not found');
    }

    if (dto.senderId === dto.receiverId) {
      throw new ForbiddenException('You cannot send a message to yourself');
    }

    const message = await this.prisma.chat.create({
      data: {
        senderId: dto.senderId,
        receiverId: dto.receiverId,
        message: dto.message,
      },
      select: {
        id: true,
        message: true,
        sender: {
          select: {
            id: true,
            email: true,
            Profile: {
              select: {
                name: true,
                username: true,
              },
            },
          },
        },
        receiver: {
          select: {
            id: true,
            email: true,
            Profile: {
              select: {
                name: true,
                username: true,
              },
            },
          },
        },
      },
    });

    return message;
  }

  async fetch(senderId: string, receiverId: string) {
    const messages = await this.prisma.chat.findMany({
      where: {
        OR: [
          { senderId, receiverId },
          { senderId: receiverId, receiverId: senderId },
        ],
      },
      select: {
        id: true,
        message: true,
        sender: {
          select: {
            id: true,
            email: true,
            Profile: {
              select: {
                name: true,
                username: true,
              },
            },
          },
        },
        receiver: {
          select: {
            id: true,
            email: true,
            Profile: {
              select: {
                name: true,
                username: true,
              },
            },
          },
        },
      },
    });

    return messages;
  }

  async delete(chatId: string, userId: string) {
    const chat = await this.prisma.chat.findUnique({
      where: { id: chatId },
    });

    if (!chat) {
      throw new NotFoundException('Message not found');
    }

    if (chat.senderId !== userId) {
      throw new ForbiddenException('You can only delete your own messages');
    }

    await this.prisma.chat.delete({
      where: { id: chatId },
    });

    return 'Message deleted';
  }
}
