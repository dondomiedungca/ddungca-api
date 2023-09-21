import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateMailDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  message: string;
}
