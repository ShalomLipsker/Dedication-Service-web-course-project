import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { Public } from './auth/decorators/public.decorator';
import { Roles } from './auth/decorators/roles.decorator';
import { LocalAuthGuard } from './auth/local/local-auth.guard';
import { Role } from './auth/Role.enum';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.managerLogin(req.user);
  }

  @Roles(Role.App)
  @Get('auth/login')
  async checkLogin(@Request() req) {
    return true;
  }
}
