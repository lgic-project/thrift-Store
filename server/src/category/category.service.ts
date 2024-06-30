import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CategoryDto } from './dto/category.dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CategoryDto) {
    const checkUser = await this.prisma.user.findFirst({
      where: {
        id: userId,
        kycVerified: true,
      },
    });
    if (!checkUser) {
      throw new ForbiddenException('Please verify your KYC details first');
    }
    const checkCategory = await this.prisma.productCategory.findFirst({
      where: {
        name: dto.name,
      },
    });
    if (checkCategory) {
      throw new BadRequestException('Category already exists');
    }
    const category = await this.prisma.productCategory.create({
      data: {
        name: dto.name,
      },
    });

    return {
      message: 'Category added successfully',
      category,
    };
  }

  async fetchAll() {
    const categories = await this.prisma.productCategory.findMany();
    return {
      message: 'Categories fetched successfully',
      categories,
    };
  }
}
