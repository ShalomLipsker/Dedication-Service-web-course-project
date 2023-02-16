import { PartialType } from '@nestjs/mapped-types';
import { CreateDedicationDto } from './create-dedication.dto';

export class UpdateDedicationDto extends PartialType(CreateDedicationDto) { }
