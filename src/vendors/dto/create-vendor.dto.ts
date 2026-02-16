import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsEmail,
  MinLength,
} from 'class-validator';

export class CreateVendorDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string; // User's name

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @IsNotEmpty()
  vendorName: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;
}
