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

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

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
}
