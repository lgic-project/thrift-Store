import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { GetCurrentUserId } from 'src/common/decorators';
import { OnEvent } from '@nestjs/event-emitter';
import { NewCommentEvent } from 'src/events/NewComment';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotificationService } from 'src/notification/notification.service';
import { NotificationType } from '@prisma/client';

@Controller('comment')
export class CommentController {
  constructor(
    private prisma: PrismaService,
    private readonly commentService: CommentService,
    private notification: NotificationService,
  ) {}

  @Post(':productId')
  async create(
    @GetCurrentUserId() userId: string,
    @Param('productId') productId: string,
    @Body() dto: { comment: string },
  ) {
    return this.commentService.create(userId, productId, dto);
  }

  @Get(':productId')
  async fetch(
    @GetCurrentUserId() userId: string,
    @Param('productId') productId: string,
  ) {
    return this.commentService.fetch(userId, productId);
  }

  @Patch('/:commentId/like')
  async toggleLike(
    @GetCurrentUserId() userId: string,
    @Param('commentId') commentId: string,
  ) {
    return this.commentService.toggleLike(userId, commentId);
  }

  @Delete('/:commentId')
  async delete(
    @GetCurrentUserId() userId: string,
    @Param('commentId') commentId: string,
  ) {
    return this.commentService.delete(userId, commentId);
  }

  @OnEvent('new_comment')
  async handleNewCommentEvent(payload: NewCommentEvent) {
    const user = await this.prisma.profile.findFirst({
      where: {
        userId: payload.userId,
      },
    });
    await this.prisma.notification.create({
      data: {
        title: 'New Comment',
        description: `${user.name} commented on your product video`,
        userId: payload.userId,
        type: NotificationType.COMMENT,
      },
    });
    await this.notification.send(
      payload.userId,
      'New Comment',
      `${user.name} commented on your product video`,
    );
  }
}
