import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { GetCurrentUserId, Public } from 'src/common/decorators';
import { CreateProductDto } from './dto/product.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { SharpInterceptor } from 'src/Interceptor/sharp-interceptor';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotificationService } from 'src/notification/notification.service';
import { OnEvent } from '@nestjs/event-emitter';
import { ProductLikeEvent } from 'src/events/ProductLike';
import { NotificationType } from '@prisma/client';

@Controller('product')
export class ProductController {
  constructor(
    private prisma: PrismaService,
    private readonly productService: ProductService,
    private notification: NotificationService,
  ) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'images', maxCount: 5 },
        { name: 'thumbnail', maxCount: 1 },
        { name: 'video', maxCount: 1 },
      ],
      {
        storage: memoryStorage(),
        fileFilter: (req, file, callback) => {
          if (file.fieldname === 'video') {
            if (!file.originalname.match(/\.(mp4|avi|mov|wmv)$/)) {
              return callback(
                new Error('Only video files are allowed!'),
                false,
              );
            }
          } else {
            if (!file.originalname.match(/\.(jpg|jpeg|png|gif|JPG|webp)$/)) {
              return callback(
                new Error('Only image files are allowed!'),
                false,
              );
            }
          }
          callback(null, true);
        },
      },
    ),
    new SharpInterceptor(),
  )
  async create(
    @GetCurrentUserId() userId: string,
    @UploadedFiles()
    files: {
      images?: Express.Multer.File[];
      thumbnail?: Express.Multer.File[];
      video?: Express.Multer.File[];
    },
    @Body() dto: CreateProductDto,
  ) {
    const images = files.images ? files.images : [];
    const thumbnail = files.thumbnail ? files.thumbnail[0] : null;
    const video = files.video ? files.video[0] : null;
    return this.productService.create(userId, dto, images, thumbnail, video);
  }

  @Public()
  @Get()
  async fetchAllRandom() {
    return this.productService.fetchAllRandom();
  }

  @Get('my')
  async fetchMyProducts(@GetCurrentUserId() userId: string) {
    return this.productService.fetchMyProducts(userId);
  }

  @Get('following')
  async fetchFollowingProducts(@GetCurrentUserId() userId: string) {
    return this.productService.fetchFollowingProducts(userId);
  }

  @Put(':productId')
  async Update(
    @GetCurrentUserId() userId: string,
    @Param('productId') productId: string,
    @Body() dto: CreateProductDto,
  ) {
    return this.productService.update(userId, productId, dto);
  }

  @Patch(':productId')
  async toggleVisibility(
    @GetCurrentUserId() userId: string,
    @Param('productId') productId: string,
  ) {
    return this.productService.toggleVisibility(userId, productId);
  }

  @Delete(':productId')
  async delete(
    @GetCurrentUserId() userId: string,
    @Param('productId') productId: string,
  ) {
    return this.productService.delete(userId, productId);
  }

  @Patch(':productId/like')
  async toggleLike(
    @GetCurrentUserId() userId: string,
    @Param('productId') productId: string,
  ) {
    return this.productService.toggleLike(userId, productId);
  }

  @OnEvent('product_like')
  async handleProductLikeEvent(payload: ProductLikeEvent) {
    const user = await this.prisma.profile.findFirst({
      where: {
        userId: payload.userId,
      },
    });
    await this.prisma.notification.create({
      data: {
        title: 'New Like',
        description: `${user.name} liked your product`,
        userId: payload.userId,
        type: NotificationType.LIKE,
      },
    });
    await this.notification.send(
      payload.userId,
      'New Like',
      `${user.name} liked your product`,
    );
  }
}
