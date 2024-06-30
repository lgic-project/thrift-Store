import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ReviewService } from './review.service';
import { GetCurrentUserId } from 'src/common/decorators';
import { ReviewDto } from './dto/review.dto';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

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
}
