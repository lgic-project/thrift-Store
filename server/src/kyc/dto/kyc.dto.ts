import { KYCType } from '@prisma/client';
import { IsNotEmpty, IsString, Validate } from 'class-validator';
import { MatchKycType } from 'src/common/validation/Role.Validator';

export class KycDTO {
  @IsNotEmpty()
  @IsString()
  nId: string;

  @Validate(MatchKycType)
  @IsNotEmpty()
  nIdType: KYCType;
}
