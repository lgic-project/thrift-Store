import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  stock: number;

  @IsOptional()
  @IsArray()
  colors: string[];

  @IsOptional()
  @IsArray()
  sizes: string[];

  @IsOptional()
  @IsString()
  categoryId: string;
}

export class UpdateProductDto{
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  price: number;

  @IsOptional()
  stock: number;

  @IsOptional()
  @IsArray()
  colors: string[];

  @IsOptional()
  @IsArray()
  sizes: string[];

  @IsOptional()
  @IsString()
  categoryId: string;
}