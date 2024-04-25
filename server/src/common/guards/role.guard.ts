import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(PrismaService) private readonly prisma: PrismaService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const role = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    const request = context.switchToHttp().getRequest();
    if (!role.includes(request.user.role)) {
      return false;
    }
    if (request.user.role === 'USER') {
      const result = await this.checkActive(request.user.id);
      return result;
    }
    return true;
  }
  checkActive = async (id: string) => {
    const user = await this.prisma.user.findFirst({
      where: {
        id,
      },
    });
    if (!user.disabled_by_admin) {
      return false;
    }
    return true;
  };
}
