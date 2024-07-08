import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { BotService } from './bot/bot.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController, UserController],
  providers: [UserService, BotService],
})
export class AppModule {}
