import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateNotificationDto,
  SendNotificationsDTO,
} from './dto/notification.dto';
import axios from 'axios';

@Injectable()
export class NotificationService {
  constructor(private prisma: PrismaService) {}

  async fetch(userId: string) {
    return this.prisma.notification.findMany({
      where: {
        userId,
      },
    });
  }

  async registerToken(userId: string, dto: CreateNotificationDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        NotificationToken: {
          upsert: {
            create: {
              token: dto.token,
            },
            update: {
              token: dto.token,
            },
          },
        },
      },
    });
    return true;
  }
  async notification(dto: SendNotificationsDTO) {
    try {
      const notificationTokens = await this.prisma.notificationToken.findMany();
      const tokenArray = notificationTokens.map((token) => {
        return {
          to: token.token,
          sound: 'default',
          title: 'Alert 📣',
          body: dto.message,
        };
      });
      await axios.post(
        'https://exp.host/--/api/v2/push/send',
        JSON.stringify(tokenArray),
        {
          headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
          },
        },
      );
      return { success: true };
    } catch (e) {
      return { success: false };
    }
  }

  async send(userId: string, title: string, message: string) {
    const tokenExists = await this.prisma.notificationToken.findFirst({
      where: {
        userId,
      },
    });
    if (!tokenExists) {
      return;
    }
    const notificationMessage = {
      to: tokenExists.token,
      sound: 'default',
      title: title,
      body: message,
    };
    await axios.post(
      'https://exp.host/--/api/v2/push/send',
      JSON.stringify(notificationMessage),
      {
        headers: {
          Accept: 'application/json',
          'Accept-encoding': 'gzip, deflate',
          'Content-Type': 'application/json',
        },
      },
    );
  }
}
