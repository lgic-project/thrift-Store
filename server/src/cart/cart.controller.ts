import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CartDto } from './dto/cart.dto';
import { GetCurrentUserId } from 'src/common/decorators';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post(':productId')
  async addToCart(
    @GetCurrentUserId() userId: string,
    @Param('productId') productId: string,
    @Body() dto: CartDto,
  ) {
    return this.cartService.addToCart(userId, productId, dto);
  }

  @Get()
  async getCart(@GetCurrentUserId() userId: string) {
    return this.cartService.getCart(userId);
  }

  @Patch(':productId')
  async removeFromCart(
    @GetCurrentUserId() userId: string,
    @Param('productId') productId: string,
  ) {
    return this.cartService.removeFromCart(userId, productId);
  }

  @Delete()
  async clearCart(@GetCurrentUserId() userId: string) {
    return this.cartService.clearCart(userId);
  }
}
