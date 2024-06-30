import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { GetCurrentUserId, Public } from 'src/common/decorators';
import { CreateProductDto } from './dto/product.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { SharpInterceptor } from 'src/Interceptor/sharp-interceptor';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'images', maxCount: 5 },
        { name: 'thumbnail', maxCount: 1 },
        { name: 'video', maxCount: 1 },
      ],
      {
        storage: memoryStorage(),
        fileFilter: (req, file, callback) => {
          if (file.fieldname === 'video') {
            if (!file.originalname.match(/\.(mp4|avi|mov|wmv)$/)) {
              return callback(
                new Error('Only video files are allowed!'),
                false,
              );
            }
          } else {
            if (!file.originalname.match(/\.(jpg|jpeg|png|gif|JPG|webp)$/)) {
              return callback(
                new Error('Only image files are allowed!'),
                false,
              );
            }
          }
          callback(null, true);
        },
      },
    ),
    new SharpInterceptor(),
  )
  async create(
    @GetCurrentUserId() userId: string,
    @UploadedFiles()
    files: {
      images?: Express.Multer.File[];
      thumbnail?: Express.Multer.File[];
      video?: Express.Multer.File[];
    },
    @Body() dto: CreateProductDto,
  ) {
    const images = files.images ? files.images : [];
    const thumbnail = files.thumbnail ? files.thumbnail[0] : null;
    const video = files.video ? files.video[0] : null;
    return this.productService.create(userId, dto, images, thumbnail, video);
  }

  @Public()
  @Get()
  async fetchAllRandom() {
    return this.productService.fetchAllRandom();
  }
}
