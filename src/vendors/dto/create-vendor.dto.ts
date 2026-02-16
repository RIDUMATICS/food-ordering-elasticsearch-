import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from "class-validator";

export class CreateVendorDto {
  @IsString()
  @IsNotEmpty({ message: 'Vendor name is required' })
  name: string;

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

  // Latitude must be between -90 and 90
  @IsNumber()
  @Min(-90)
  @Max(90)
  latitude: number;

  // Longitude must be between -180 and 180
  @IsNumber()
  @Min(-180)
  @Max(180)
  longitude: number;
}