import { Module } from '@nestjs/common';
import { KycService } from './kyc.service';
import { KycController } from './kyc.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { StorageService } from 'src/storage/storage.service';
import { NotificationService } from 'src/notification/notification.service';

@Module({
  controllers: [KycController],
  providers: [KycService, PrismaService, StorageService, NotificationService],
})
export class KycModule {}
