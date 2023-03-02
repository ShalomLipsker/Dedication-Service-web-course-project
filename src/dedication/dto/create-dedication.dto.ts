import { Type } from 'class-transformer';
import {
  IsDataURI,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';

export class PlainHebDateDto {
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Max(30)
  day: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Max(13)
  month: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(5500)
  @Max(6000)
  year: number;
}

export class CreateDedicationDto {
  @IsDataURI()
  @IsNotEmpty()
  image: any;

  @IsString()
  @IsNotEmpty()
  title: string;

  @ValidateNested({ each: true })
  @IsNotEmpty()
  @Type(() => PlainHebDateDto)
  date: PlainHebDateDto;

  @IsString()
  description: string;

  @IsDateString()
  @IsNotEmpty()
  expiredAt: Date;
}
