import { Injectable } from '@nestjs/common';
import ImageKit from 'imagekit';
import sharp from 'sharp';

@Injectable()
export class StorageService {
  private readonly imageKit: ImageKit;

  constructor() {
    this.imageKit = new ImageKit({
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
      urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
    });
  }

  async uploadPhoto(file: Express.Multer.File): Promise<string> {
    const buffer = await sharp(file.buffer).webp().toBuffer();
    const res = await this.imageKit.upload({
      file: buffer,
      fileName: file.originalname,
      folder: '/uploads/pictures',
    });
    return res.url;
  }
}
