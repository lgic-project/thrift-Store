import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { KycService } from './kyc.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { SharpInterceptor } from 'src/Interceptor/sharp-interceptor';
import { GetCurrentUserId, Roles } from 'src/common/decorators';
import { KycDTO } from './dto/kyc.dto';
import { RoleGuard } from 'src/common/guards';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotificationService } from 'src/notification/notification.service';
import { OnEvent } from '@nestjs/event-emitter';

@Controller('kyc')
export class KycController {
  constructor(
    private prisma: PrismaService,
    private readonly kycService: KycService,
    private notification: NotificationService,
  ) {}

  @Post('/')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'nIdFront', maxCount: 1 },
        { name: 'nIdBack', maxCount: 1 },
      ],
      {
        storage: memoryStorage(),
        fileFilter: (req, file, callback) => {
          if (!file.originalname.match(/\.(jpg|jpeg|png|gif|JPG|webp)$/)) {
            return callback(new Error('Only image files are allowed!'), false);
          }
          callback(null, true);
        },
      },
    ),
    new SharpInterceptor(),
  )
  async fillKYC(
    @GetCurrentUserId() userId: string,
    @UploadedFiles()
    files: {
      nIdFront?: Express.Multer.File[];
      nIdBack?: Express.Multer.File[];
    },
    @Body() dto: KycDTO,
  ) {
    const nidFront = files.nIdFront ? files.nIdFront[0] : null;
    const nidBack = files.nIdBack ? files.nIdBack[0] : null;
    return this.kycService.fillKYC(userId, nidFront, nidBack, dto);
  }

  @Get('/unverified')
  @Roles('SUPERADMIN')
  @UseGuards(RoleGuard)
  async getUnverifiedKYC() {
    return this.kycService.getUnverifiedKYC();
  }

  @Get('/verified')
  @Roles('SUPERADMIN')
  @UseGuards(RoleGuard)
  async getVerifiedKYC() {
    return this.kycService.getVerifiedKYC();
  }

  @Patch('/:kycId/verify')
  @Roles('SUPERADMIN')
  @UseGuards(RoleGuard)
  async verifyKYC(@Param('kycId') kycId: string) {
    return this.kycService.verifyKYC(kycId);
  }

  @OnEvent('kyc.verified')
  async handleKYCVerifiedEvent(payload: { userId: string }) {
    await this.prisma.notification.create({
      data: {
        title: 'KYC Verified',
        description: `Your KYC has been verified`,
        userId: payload.userId,
        type: 'KYC',
      },
    });
    await this.notification.send(
      payload.userId,
      'KYC Verified',
      `Your KYC has been verified`,
    );
  }
}
