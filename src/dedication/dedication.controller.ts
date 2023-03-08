import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/Role.enum';
import { DedicationService } from './dedication.service';
import { CreateDedicationDto } from './dto/create-dedication.dto';
import { UpdateDedicationDto } from './dto/update-dedication.dto';

@Controller('dedication')
export class DedicationController {
  constructor(private readonly dedicationService: DedicationService) {}

  @Post()
  @Roles(Role.Manager)
  create(@Body() createDedicationDto: CreateDedicationDto) {
    return this.dedicationService.create(createDedicationDto);
  }

  @Get()
  @Roles(Role.Manager)
  findAll() {
    return this.dedicationService.findAll();
  }

  @Get('hd')
  @Roles(Role.App)
  findByHebDate(
    @Query('day', ParseIntPipe) day: number,
    @Query('month', ParseIntPipe) month: number,
  ) {
    return this.dedicationService.findByHebDate({ day, month });
  }

  @Get(':id')
  @Roles(Role.Manager)
  findOne(@Param('id') id: string) {
    return this.dedicationService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.Manager)
  update(
    @Param('id') id: string,
    @Body() updateDedicationDto: UpdateDedicationDto,
  ) {
    return this.dedicationService.update(id, updateDedicationDto);
  }

  @Delete(':id')
  @Roles(Role.Manager)
  remove(@Param('id') id: string) {
    return this.dedicationService.remove(id);
  }
}
