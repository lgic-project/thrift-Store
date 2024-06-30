import { IsString } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class SendNotificationsDTO {
  @IsString()
  message: string;
}
