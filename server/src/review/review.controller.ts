import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ReviewService } from './review.service';
import { GetCurrentUserId } from 'src/common/decorators';
import { ReviewDto } from './dto/review.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotificationService } from 'src/notification/notification.service';
import { OnEvent } from '@nestjs/event-emitter';
import { NewReviewEvent } from 'src/events/NewReview';
import { NotificationType } from '@prisma/client';

@Controller('review')
export class ReviewController {
  constructor(
    private prisma: PrismaService,
    private readonly reviewService: ReviewService,
    private notification: NotificationService,
  ) {}

  @Post(':productId')
  async review(
    @GetCurrentUserId() userId: string,
    @Param('productId') productId: string,
    @Body() dto: ReviewDto,
  ) {
    return this.reviewService.review(userId, productId, dto);
  }

  @Get(':productId')
  async fetch(@Param('productId') productId: string) {
    return this.reviewService.fetch(productId);
  }

  @Get(':productId/star')
  async fetchStarAvg(@Param('productId') productId: string) {
    return this.reviewService.fetchStarAvg(productId);
  }

  @Delete(':reviewId')
  async delete(
    @GetCurrentUserId() userId: string,
    @Param('reviewId') reviewId: string,
  ) {
    return this.reviewService.delete(userId, reviewId);
  }

  @OnEvent('new_review')
  async handleNewReviewEvent(payload: NewReviewEvent) {
    const user = await this.prisma.profile.findFirst({
      where: {
        userId: payload.userId,
      },
    });
    await this.prisma.notification.create({
      data: {
        title: 'New Review',
        description: `${user.name} reviewed your product`,
        userId: payload.userId,
        type: NotificationType.REVIEW,
      },
    });
    await this.notification.send(
      payload.userId,
      'New Review',
      `${user.name} reviewed your product`,
    );
  }
}
