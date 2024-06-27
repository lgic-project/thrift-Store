import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { GetCurrentUserId, Public } from 'src/common/decorators';
import { SignInDto, SignUpDto, UpdateProfileDto } from './dto/auth.dto';
import { Tokens } from './types';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { SharpInterceptor } from 'src/Interceptor/sharp-interceptor';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  signUp(@Body() dto: SignUpDto): Promise<Tokens> {
    return this.authService.signUp(dto);
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  signIn(@Body() dto: SignInDto): Promise<Tokens> {
    return this.authService.signIn(dto);
  }

  @Get('me')
  getMe(@GetCurrentUserId() userId: string) {
    return this.authService.getMe(userId);
  }

  @Patch('update')
  @UseInterceptors(
    FileInterceptor('avatar', {
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
  updateProfile(
    @Body() dto: UpdateProfileDto,
    @GetCurrentUserId() userId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.authService.updateProfile(userId, dto, file);
  }
}
