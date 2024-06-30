import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotificationService } from 'src/notification/notification.service';

@Module({
  controllers: [CommentController],
  providers: [CommentService, PrismaService, NotificationService],
})
export class CommentModule {}
