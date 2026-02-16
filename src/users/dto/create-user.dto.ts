import { IsEmail, IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim()?.toLowerCase())
  email: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim())
  name: string;

  @IsString()
  @MinLength(6)
  @Transform(({ value }) => value?.trim())
  password: string;
}
