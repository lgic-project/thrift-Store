import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CartDto } from './dto/cart.dto';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async addToCart(userId: string, productId: string, dto: CartDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
        kycVerified: true,
      },
    });
    if (!user) {
      throw new ForbiddenException('User not verified');
    }
    const product = await this.prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (product.stock < dto.quantity) {
      throw new BadRequestException(
        'Product stock is less than quantity requested',
      );
    }

    if (product.userId === userId) {
      throw new BadRequestException('You cannot add your own product to cart');
    }

    const cart = await this.prisma.cart.findFirst({
      where: {
        userId,
        productId,
      },
    });

    if (cart) {
      return 'Product already in cart';
    }

    await this.prisma.cart.create({
      data: {
        userId,
        productId,
        quantity: dto.quantity,
        totalAmount: dto.totalAmount,
      },
    });

    return 'Product added to cart';
  }

  async getCart(userId: string) {
    const cart = await this.prisma.cart.findMany({
      where: {
        userId,
      },
    });

    const totalAmount = cart.reduce((acc, item) => acc + item.totalAmount, 0);

    return {
      totalAmount,
      cart,
    };
  }

  async removeFromCart(userId: string, productId: string) {
    const cart = await this.prisma.cart.findFirst({
      where: {
        userId,
        productId,
      },
    });

    if (!cart) {
      throw new NotFoundException('Product not found in cart');
    }

    await this.prisma.cart.delete({
      where: {
        id: cart.id,
      },
    });

    return 'Product removed from cart';
  }

  async clearCart(userId: string) {
    await this.prisma.cart.deleteMany({
      where: {
        userId,
      },
    });

    return 'Cart cleared';
  }
}
