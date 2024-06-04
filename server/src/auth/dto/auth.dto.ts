import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Validate,
} from 'class-validator';
import { IsNepaliPhoneNumber } from '../validators/nepali-phone-number.validator';

export class SignInDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @Validate(IsNepaliPhoneNumber)
  phone: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  confirmPassword: string;

  @IsNotEmpty()
  @IsString()
  permanentAddress: string;

  @IsNotEmpty()
  @IsString()
  temporaryAddress: string;

  @IsNotEmpty()
  @IsString()
  dob: string;

  @IsNotEmpty()
  @IsString()
  occupation: string;

  @IsNotEmpty()
  @IsString()
  voterId: string;

  @IsString()
  @IsOptional()
  referralCode: string;

  @IsNotEmpty()
  @IsNumber()
  province: number;

  @IsNotEmpty()
  @IsString()
  district: string;

  @IsNotEmpty()
  @IsString()
  municipality: string;

  @IsNotEmpty()
  @IsString()
  ward: string;
}