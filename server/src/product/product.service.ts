import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { StorageService } from 'src/storage/storage.service';
import { CreateProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(
    private prisma: PrismaService,
    private readonly storageService: StorageService,
  ) {}

  async create(
    userId: string,
    dto: CreateProductDto,
    images: Express.Multer.File[],
    thumbnail: Express.Multer.File,
    video: Express.Multer.File,
  ) {
    let imageUrls: string[] = [];

    let thumbnailUrl: string = '';

    let videoUrl: string = '';

    if (images.length) {
      imageUrls = await Promise.all(
        images.map((image) => this.storageService.uploadPhoto(image)),
      );
    } else {
      throw new ForbiddenException('At least one image is required');
    }

    if (thumbnail) {
      thumbnailUrl = await this.storageService.uploadPhoto(thumbnail);
    }

    if (video) {
      videoUrl = await this.storageService.uploadVideo(video);
    }

    if (dto.categoryId) {
      const findCategory = await this.prisma.productCategory.findUnique({
        where: {
          id: dto.categoryId,
        },
      });

      if (!findCategory) {
        throw new NotFoundException('Category not found');
      }
    }

    const product = await this.prisma.product.create({
      data: {
        name: dto.name,
        description: dto.description,
        price: Number(dto.price),
        stock: Number(dto.stock),
        ProductColor: dto.colors,
        ProductSize: dto.sizes,
        productCategoryId: dto.categoryId,
        ProductImages: imageUrls,
        userId,
        ProductVideo: {
          create: {
            video: videoUrl,
            thumbnail: thumbnailUrl,
          },
        },
      },
      include: {
        ProductCategory: true,
        user: {
          select: {
            id: true,
            email: true,
            phone: true,
            Profile: true,
          },
        },
        ProductVideo: true,
      },
    });

    return product;
  }

  async fetchAllRandom() {
    const allProductIds = await this.prisma.product.findMany({
      select: { id: true },
    });
    const ids = allProductIds.map((product) => product.id);

    const randomIds = [];
    for (let i = 0; i < Math.min(10, ids.length); i++) {
      const randomIndex = Math.floor(Math.random() * ids.length);
      randomIds.push(ids[randomIndex]);
      ids.splice(randomIndex, 1);
    }

    const randomProducts = await this.prisma.product.findMany({
      where: { id: { in: randomIds } },
      include: {
        ProductCategory: true,
        ProductVideo: true,
        user: {
          select: {
            id: true,
            email: true,
            phone: true,
            Profile: true,
          },
        },
      },
    });

    return randomProducts;
  }
}
