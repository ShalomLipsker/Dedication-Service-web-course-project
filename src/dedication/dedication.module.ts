import { Module } from '@nestjs/common';
import { DedicationService } from './dedication.service';
import { DedicationController } from './dedication.controller';
import { DatabaseModule } from '../database/database.module';
import { dedicationProviders } from 'src/database/dedication.providers';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';

@Module({
  imports: [DatabaseModule],
  controllers: [DedicationController],
  providers: [
    DedicationService,
    ...dedicationProviders,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ]
})
export class DedicationModule { }
