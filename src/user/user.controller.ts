import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  getUserById(@Param('id') id: string) {
    const user = this.userService.getUserById(id);
    if (!user) {
      return 'User not found';
    }
    return user;
  }

  @Post()
  createUser(@Body() createUserDto: any) {
    return this.userService.createUser(createUserDto);
  }
}
