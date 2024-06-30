import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { StorageService } from 'src/storage/storage.service';
import {
  CreateProductDto,
  UpdateProductDto,
} from './dto/product.dto';

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
    const checkKyc = await this.prisma.user.findFirst({
      where: {
        id: userId,
        kycVerified: true,
      },
    });

    if (!checkKyc) {
      throw new ForbiddenException('You need to verify your KYC first');
    }

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
      where: { id: { in: randomIds }, stock: { gt: 0 }, visibility: true },
      include: {
        ProductCategory: true,
        ProductVideo: true,
        Like: true,
        Comment: {
          include: {
            Like: true,
          },
        },
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

  async fetchMyProducts(userId: string) {
    const myProducts = await this.prisma.product.findMany({
      where: {
        userId,
      },
      include: {
        ProductCategory: true,
        ProductVideo: true,
        Like: true,
        Comment: {
          include: {
            Like: true,
          },
        },
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

    return myProducts;
  }

  async fetchFollowingProducts(userId: string) {
    const following = await this.prisma.follow.findMany({
      where: {
        followerId: userId,
      },
      select: {
        followingId: true,
      },
    });

    const followingIds = following.map((follow) => follow.followingId);

    const followingProducts = await this.prisma.product.findMany({
      where: {
        userId: { in: followingIds },
        stock: { gt: 0 },
        visibility: true,
      },
      include: {
        ProductCategory: true,
        ProductVideo: true,
        Like: true,
        Comment: {
          include: {
            Like: true,
          },
        },
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

    return followingProducts;
  }

  async update(userId: string, productId: string, dto: UpdateProductDto) {
    const product = await this.prisma.product.findUnique({
      where: {
        id: productId,
      },
    });
    if (product.userId !== userId) {
      throw new ForbiddenException(
        'You are not authorized to update this product',
      );
    }

    if (dto.categoryId) {
      // Check if the categoryId exists in the ProductCategory table
      const categoryExists = await this.prisma.productCategory.findUnique({
        where: {
          id: dto.categoryId,
        },
      });

      if (!categoryExists) {
        throw new Error('The provided categoryId does not exist');
      }
    }

    const update = await this.prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        name: dto.name,
        description: dto.description,
        price: dto.price,
        stock: dto.stock,
        ProductColor: dto.colors,
        ProductSize: dto.sizes,
        productCategoryId: dto.categoryId,
      },
      include: {
        ProductCategory: true,
        ProductVideo: true,
        Like: true,
        Comment: {
          include: {
            Like: true,
          },
        },
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

    return {
      message: 'Product updated successfully',
      updatedProduct: update,
    };
  }

  async toggleVisibility(userId: string, productId: string) {
    const product = await this.prisma.product.findUnique({
      where: {
        id: productId,
      },
    });
    if (product.userId !== userId) {
      throw new ForbiddenException(
        'You are not authorized to update this product',
      );
    }

    const update = await this.prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        visibility: !product.visibility,
      },
      include: {
        ProductCategory: true,
        ProductVideo: true,
        Like: true,
        Comment: {
          include: {
            Like: true,
          },
        },
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

    return {
      message: 'Product visibility updated successfully',
      updatedProduct: update,
    };
  }

  async toggleLike(userId: string, productId: string) {
    const product = await this.prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const like = await this.prisma.like.findUnique({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
    });

    if (like) {
      await this.prisma.like.delete({
        where: {
          userId_productId: {
            userId,
            productId,
          },
        },
      });

      return {
        message: 'Like removed successfully',
      };
    }

    await this.prisma.like.create({
      data: {
        userId,
        productId,
      },
    });

    return {
      message: 'Like added successfully',
    };
  }

  async delete(userId: string, productId: string) {
    const product = await this.prisma.product.findUnique({
      where: {
        id: productId,
      },
    });
    if (product.userId !== userId) {
      throw new ForbiddenException(
        'You are not authorized to delete this product',
      );
    }

    await this.prisma.product.delete({
      where: {
        id: productId,
      },
    });

    return {
      message: 'Product deleted successfully',
    };
  }
}
