import { Body, Controller, Get, Post } from '@nestjs/common';
import { NotificationService } from './notification.service';
import {
  SendNotificationsDTO,
} from './dto/notification.dto';
import { GetCurrentUserId } from 'src/common/decorators';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get('')
  fetch(@GetCurrentUserId() userId: string) {
    return this.notificationService.fetch(userId);
  }

  @Post('send')
  notification(@Body() SendNotificationsDTO: SendNotificationsDTO) {
    return this.notificationService.notification(SendNotificationsDTO);
  }
}
