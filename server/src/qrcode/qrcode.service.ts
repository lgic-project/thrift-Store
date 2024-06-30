import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { StorageService } from 'src/storage/storage.service';

@Injectable()
export class QrcodeService {
  constructor(
    private prisma: PrismaService,
    private readonly storageService: StorageService,
  ) {}

  async create(userId: string, file: Express.Multer.File) {
    let url: string = '';
    if (file) {
      url = await this.storageService.uploadPhoto(file);
    }

    const qrCode = this.prisma.qrcode.upsert({
      where: { userId },
      update: { qrCode: url },
      create: { userId, qrCode: url },
    });

    return qrCode;
  }

  async fetch(userId: string) {
    const qrCode = await this.prisma.qrcode.findUnique({
      where: { userId },
    });

    return qrCode;
  }
}
