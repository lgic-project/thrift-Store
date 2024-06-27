import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findAllUsers(userId: string) {
    return await this.prisma.user.findMany({
      where: {
        NOT: {
          id: userId,
        },
      },
      select: {
        id: true,
        phone: true,
        role: true,
        Profile: true,
      },
    });
  }

  async findUserByID(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        phone: true,
        role: true,
        Profile: true,
      },
    });
    if (!user) {
      throw new NotFoundException('User Not Found');
    }
    return user;
  }

  async getUserByProvince(province: number) {
    return await this.prisma.user.findMany({
      where: {
        Profile: {
          province: province,
        },
      },
      select: {
        id: true,
        phone: true,
        role: true,
        Profile: true,
      },
    });
  }

  async getUserByDistrict(district: string) {
    return await this.prisma.user.findMany({
      where: {
        Profile: {
          district: {
            equals: district,
            mode: 'insensitive', // This line ensures the comparison is case-insensitive
          },
        },
      },
      select: {
        id: true,
        phone: true,
        role: true,
        Profile: true,
      },
    });
  }

  async getUserByMunicipality(municipality: string) {
    return await this.prisma.user.findMany({
      where: {
        Profile: {
          municipality: {
            equals: municipality,
            mode: 'insensitive',
          },
        },
      },
      select: {
        id: true,
        phone: true,
        role: true,
        Profile: true,
      },
    });
  }

  async getUserByWard(municipality: string, ward: string) {
    return await this.prisma.user.findMany({
      where: {
        Profile: {
          municipality: {
            equals: municipality,
            mode: 'insensitive',
          },
          ward: ward,
        },
      },
      select: {
        id: true,
        phone: true,
        role: true,
        Profile: true,
      },
    });
  }

  async disableUserByID(userId: string, myId: string) {
    const user = await this.findUserByID(userId);
    if (myId === userId) {
      throw new ForbiddenException(
        'If you want to disable your account then please approach a different method',
      );
    }
    if (user.role === 'SUPERADMIN') {
      throw new ForbiddenException('SUPERADMIN cannot be disabled like this');
    }
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        disabled_by_admin: true,
      },
    });
    return { success: true };
  }

  async deleteUserByID(userId: string, myId: string) {
    const user = await this.findUserByID(userId);
    if (myId === userId) {
      throw new ForbiddenException(
        'If you want to delete your account then please approach a different method',
      );
    }
    if (user.role === 'SUPERADMIN') {
      throw new ForbiddenException('SUPERADMIN cannot be deleted like this');
    }
    await this.prisma.user.delete({
      where: {
        id: userId,
      },
    });
    return { success: true };
  }
}
