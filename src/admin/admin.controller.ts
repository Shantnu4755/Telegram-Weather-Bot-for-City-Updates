import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('admin')
export class AdminController {

  @Get('settings')
  @UseGuards(AuthGuard('google'))
  getSettings(): string {
    return 'Admin settings page';
  }

  @Get('users')
  @UseGuards(AuthGuard('google'))
  getUsers(): string {
    return 'Admin users page';
  }
}
