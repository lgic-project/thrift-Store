import { Controller, Param, Patch } from '@nestjs/common';
import { FollowService } from './follow.service';
import { GetCurrentUserId } from 'src/common/decorators';
import { NotificationService } from 'src/notification/notification.service';
import { OnEvent } from '@nestjs/event-emitter';
import { NewFollowerEvent } from 'src/events/NewFollower';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotificationType } from '@prisma/client';

@Controller('follow')
export class FollowController {
  constructor(
    private prisma: PrismaService,
    private readonly followService: FollowService,
    private notification: NotificationService,
  ) {}

  @Patch('/:followingId')
  async followUser(
    @GetCurrentUserId() followerId: string,
    @Param('followingId') followingId: string,
  ) {
    return this.followService.followUser(followerId, followingId);
  }

  @OnEvent('follow')
  async handleFollowEvent(payload: NewFollowerEvent) {
    const user = await this.prisma.profile.findFirst({
      where: {
        userId: payload.followedId,
      },
    });
    await this.prisma.notification.create({
      data: {
        title: 'New Follower',
        description: `${user.name} followed you`,
        userId: payload.followedId,
        type: NotificationType.FOLLOW,
      },
    });
    await this.notification.send(
      payload.followedId,
      'New Follower',
      `${user.name} followed you`,
    );
  }
}
