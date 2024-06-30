import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotificationService } from 'src/notification/notification.service';

@Module({
  controllers: [ReviewController],
  providers: [ReviewService, PrismaService, NotificationService],
})
export class ReviewModule {}
