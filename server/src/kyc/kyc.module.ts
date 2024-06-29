import { Module } from '@nestjs/common';
import { KycService } from './kyc.service';
import { KycController } from './kyc.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { StorageService } from 'src/storage/storage.service';

@Module({
  controllers: [KycController],
  providers: [KycService, PrismaService, StorageService],
})
export class KycModule {}
