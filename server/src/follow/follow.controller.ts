import { Controller, Param, Patch } from '@nestjs/common';
import { FollowService } from './follow.service';
import { GetCurrentUserId } from 'src/common/decorators';

@Controller('follow')
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  @Patch('/:followingId')
  async followUser(
    @GetCurrentUserId() followerId: string,
    @Param('followingId') followingId: string,
  ) {
    return this.followService.followUser(followerId, followingId);
  }
}
