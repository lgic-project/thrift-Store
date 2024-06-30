import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ReviewDto } from './dto/review.dto';

@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) {}

  async review(userId: string, productId: string, dto: ReviewDto) {
    const product = await this.prisma.product.findUnique({
      where: {
        id: productId,
      },
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const review = await this.prisma.productReview.upsert({
      where: {
        reviewerId_productId: {
          reviewerId: userId,
          productId,
        },
      },
      update: {
        rating: dto.rating,
        review: dto.review,
      },
      create: {
        rating: dto.rating,
        review: dto.review,
        reviewerId: userId,
        productId,
      },
    });

    return review;
  }

  async fetch(productId: string) {
    const product = await this.prisma.product.findUnique({
      where: {
        id: productId,
      },
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    const reviews = await this.prisma.productReview.findMany({
      where: {
        productId,
      },
    });
    return reviews;
  }

  async fetchStarAvg(productId: string) {
    const product = await this.prisma.product.findUnique({
      where: {
        id: productId,
      },
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    const reviews = await this.prisma.productReview.findMany({
      where: {
        productId,
      },
    });
    const total = reviews.length;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    const avg = sum / total;
    return avg;
  }

  async delete(userId: string, reviewId: string) {
    const review = await this.prisma.productReview.findUnique({
      where: {
        id: reviewId,
      },
    });
    if (!review) {
      throw new NotFoundException('Review not found');
    }
    if (review.reviewerId !== userId) {
      throw new NotFoundException(
        'You are not authorized to delete this review',
      );
    }
    await this.prisma.productReview.delete({
      where: {
        id: reviewId,
      },
    });
    return {
      message: 'Review deleted successfully',
    };
  }
}
