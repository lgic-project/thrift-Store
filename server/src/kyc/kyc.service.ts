import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { KycDTO } from './dto/kyc.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { StorageService } from 'src/storage/storage.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { KycVerificationEvent } from 'src/events/KycVerification';

@Injectable()
export class KycService {
  constructor(
    private prisma: PrismaService,
    private readonly storageService: StorageService,
    private eventEmitter: EventEmitter2,
  ) {}

  async fillKYC(
    userId: string,
    nIdFront: Express.Multer.File,
    nIdBack: Express.Multer.File,
    dto: KycDTO,
  ) {
    let urlFront: string = '';
    let urlBack: string = '';
    if (nIdFront) {
      urlFront = await this.storageService.uploadPhoto(nIdFront);
    } else {
      throw new ForbiddenException('NID Front is required');
    }
    if (nIdBack) {
      urlBack = await this.storageService.uploadPhoto(nIdBack);
    } else {
      throw new ForbiddenException('NID Back is required');
    }

    const checkKYC = await this.prisma.kYC.findFirst({
      where: {
        userId,
        nid: dto.nId,
        user: {
          kycVerified: true,
        },
      },
    });

    if (checkKYC) {
      throw new ForbiddenException('KYC already verified');
    }

    const checkSubmission = await this.prisma.kYC.findFirst({
      where: {
        userId,
      },
    });

    if (checkSubmission) {
      throw new ForbiddenException(
        'KYC already submitted, wait for verification',
      );
    }

    const kyc = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        KYC: {
          create: {
            nid: dto.nId,
            nidType: dto.nIdType,
            nidFront: urlFront,
            nidBack: urlBack,
          },
        },
      },
      select: {
        Profile: true,
        KYC: true,
      },
    });

    return {
      message: 'KYC submitted successfully, please wait for verification',
      kyc,
    };
  }

  async getUnverifiedKYC() {
    return await this.prisma.kYC.findMany({
      where: {
        user: {
          kycVerified: false,
        },
      },
      select: {
        id: true,
        nid: true,
        nidType: true,
        nidFront: true,
        nidBack: true,
        user: {
          select: {
            id: true,
            phone: true,
            Profile: true,
          },
        },
      },
    });
  }

  async getVerifiedKYC() {
    return await this.prisma.kYC.findMany({
      where: {
        user: {
          kycVerified: true,
        },
      },
      select: {
        id: true,
        nid: true,
        nidType: true,
        nidFront: true,
        nidBack: true,
        user: {
          select: {
            id: true,
            phone: true,
            Profile: true,
          },
        },
      },
    });
  }

  async verifyKYC(kycId: string) {
    const findKyc = await this.prisma.kYC.findFirst({
      where: {
        id: kycId,
      },
    });
    if (!findKyc) {
      throw new NotFoundException('KYC not found');
    }
    const checkKYC = await this.prisma.kYC.findFirst({
      where: {
        id: kycId,
        user: {
          kycVerified: true,
        },
      },
    });
    if (checkKYC) {
      throw new ForbiddenException('KYC already verified');
    }
    const kyc = await this.prisma.kYC.update({
      where: {
        id: kycId,
      },
      data: {
        user: {
          update: {
            kycVerified: true,
          },
        },
      },
      select: {
        nid: true,
        nidType: true,
        nidFront: true,
        nidBack: true,
        user: {
          select: {
            id: true,
            phone: true,
            Profile: {
              select: {
                name: true,
                municipality: true,
                ward: true,
              },
            },
          },
        },
      },
    });

    this.eventEmitter.emit(
      'kyc.verified',
      new KycVerificationEvent(kyc.user.id, 'KYC verified successfully'),
    );

    return {
      message: 'KYC verified successfully',
      kyc,
    };
  }
}
