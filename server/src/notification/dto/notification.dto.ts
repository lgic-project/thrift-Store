import { IsString } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CreateNotificationDto {
  @IsString()
  token: string;
}

export class SendNotificationsDTO {
  @IsString()
  message: string;
}

export class UpdateNotificationDto extends PartialType(CreateNotificationDto) {}
