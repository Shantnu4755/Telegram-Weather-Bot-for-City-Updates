import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user/user.service';

@Controller()
export class AppController {
  constructor(private readonly userService: UserService) {}

  @Get('user/:id')
  getUserById(@Param('id') id: string) {
    const user = this.userService.getUserById(id);
    if (!user) {
      return 'User not found';
    }
    return user;
  }
}
