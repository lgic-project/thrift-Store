import { IsNotEmpty, IsNumber } from 'class-validator';

export class CartDto {
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  totalAmount: number;
}
