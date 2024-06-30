import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { QrcodeService } from './qrcode.service';
import { GetCurrentUserId } from 'src/common/decorators';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { SharpInterceptor } from 'src/Interceptor/sharp-interceptor';

@Controller('qrcode')
export class QrcodeController {
  constructor(private readonly qrcodeService: QrcodeService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('qrcode', {
      storage: memoryStorage(),
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif|JPG|webp)$/)) {
          return callback(null, false);
        } else {
          callback(null, true);
        }
      },
    }),
    new SharpInterceptor(),
  )
  async create(
    @GetCurrentUserId() userId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.qrcodeService.create(userId, file);
  }

  @Get()
  async fetch(@GetCurrentUserId() userId: string) {
    return this.qrcodeService.fetch(userId);
  }
}
