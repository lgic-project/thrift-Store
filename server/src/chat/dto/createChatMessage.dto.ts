import { IsNotEmpty, IsString } from 'class-validator';

export class CreateChatMessageDto {
  @IsNotEmpty()
  @IsString()
  senderId: string;

  @IsNotEmpty()
  @IsString()
  receiverId: string;

  @IsNotEmpty()
  @IsString()
  message: string;
}
