import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('users')
  getUsers() {
    return this.adminService.getUsers();
  }

  @Post('block/:id')
  blockUser(@Param('id') id: string) {
    return this.adminService.blockUser(id);
  }

  @Post('settings')
  updateSettings(@Body() settings: any) {
    return this.adminService.updateSettings(settings);
  }
}
