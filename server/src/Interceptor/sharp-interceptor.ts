import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import sharp from 'sharp';

@Injectable()
export class SharpInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const file = request.file;
    if (file) {
      return next.handle().pipe(
        map(async (data) => {
          // Apply image conversion to WebP using sharp
          await sharp(file.buffer).toFormat('webp').toBuffer();
          // Replace the original buffer with the converted one
          return data;
        }),
      );
    }

    return next.handle();
  }
}
