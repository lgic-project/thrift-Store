import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ReviewDto {
  @IsNotEmpty()
  @IsNumber()
  rating: number;

  @IsNotEmpty()
  @IsString()
  review: string;
}
