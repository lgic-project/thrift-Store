import { Module } from '@nestjs/common';
import { QrcodeService } from './qrcode.service';
import { QrcodeController } from './qrcode.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { StorageService } from 'src/storage/storage.service';

@Module({
  controllers: [QrcodeController],
  providers: [QrcodeService, PrismaService, StorageService],
})
export class QrcodeModule {}
