import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FollowService {
  constructor(private prisma: PrismaService) {}

  async followUser(followerId: string, followingId: string) {
    const checkUser = await this.prisma.user.findUnique({
      where: {
        id: followingId,
      },
    });

    if (!checkUser) {
      throw new NotFoundException(
        'The user you are trying to follow does not exist',
      );
    }
    
    const checkSelfFollow = followerId === followingId;
    
    if (checkSelfFollow) {
      throw new BadRequestException('You cannot follow yourself');
    }

    const follow = await this.prisma.follow.findFirst({
      where: {
        followerId,
        followingId,
      },
    });
    if (follow) {
      await this.prisma.follow.delete({
        where: {
          id: follow.id,
        },
      });
      return {
        message: 'You un-followed the user',
      };
    } else {
      await this.prisma.follow.create({
        data: {
          followerId,
          followingId,
        },
      });
      return {
        message: 'You followed the user',
      };
    }
  }
}
