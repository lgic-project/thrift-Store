import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CommentDto } from './dto/comment.dto';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, productId: string, dto: CommentDto) {
    const product = await this.prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const comment = await this.prisma.comment.create({
      data: {
        userId,
        productId,
        comment: dto.comment,
      },
    });

    return comment;
  }

  async fetch(userId: string, productId: string) {
    // Fetch comments with related user and like information
    const comments = await this.prisma.comment.findMany({
      where: {
        productId,
      },
      include: {
        User: {
          select: {
            id: true,
            Profile: {
              select: {
                username: true,
              },
            },
          },
        },
        Like: {
          select: {
            userId: true,
          },
        },
      },
    });

    // Optionally, enhance comments with like count if needed for sorting or display

    // Sort comments by like count (assuming an added likeCount property)
    const sortedComments = comments.sort((a, b) => {
      // Assuming a likeCount property that you've added
      return b.Like.length - a.Like.length;
    });

    // Find and move the current user's comment to the front, if it exists
    const currentUserCommentIndex = sortedComments.findIndex(
      (comment) => comment.User.id === userId,
    );
    if (currentUserCommentIndex > -1) {
      const [currentUserComment] = sortedComments.splice(
        currentUserCommentIndex,
        1,
      );
      sortedComments.unshift(currentUserComment);
    }

    return sortedComments;
  }

  async toggleLike(userId: string, commentId: string) {
    const comment = await this.prisma.comment.findUnique({
      where: {
        id: commentId,
      },
    });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    const like = await this.prisma.like.findUnique({
      where: {
        userId_commentId: {
          userId,
          commentId,
        },
      },
    });

    if (like) {
      await this.prisma.like.delete({
        where: {
          userId_commentId: {
            userId,
            commentId,
          },
        },
      });

      return {
        message: 'Like removed successfully from the comment',
      };
    }

    await this.prisma.like.create({
      data: {
        userId,
        commentId,
      },
    });

    return {
      message: 'Like added successfully to the comment',
    };
  }

  async delete(userId: string, commentId: string) {
    const comment = await this.prisma.comment.findUnique({
      where: {
        id: commentId,
      },
    });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    if (comment.userId !== userId) {
      throw new NotFoundException('You are not allowed to delete this comment');
    }

    await this.prisma.comment.delete({
      where: {
        id: commentId,
      },
    });

    return {
      message: 'Comment deleted successfully',
    };
  }
}
