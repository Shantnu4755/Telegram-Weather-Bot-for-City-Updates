import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Telegraf } from 'telegraf';
import { Cron } from '@nestjs/schedule';
import axios from 'axios';
import { UserService } from '../user/user.service';

@Injectable()
export class BotService implements OnModuleInit {
  private bot: Telegraf;

  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    const token = this.configService.get<string>('TELEGRAM_BOT_TOKEN');
    this.bot = new Telegraf(token);

    this.bot.start((ctx) => this.start(ctx));
    this.bot.command('unsubscribe', (ctx) => this.unsubscribe(ctx));
    this.bot.command('weather', (ctx) => this.weather(ctx));
  }

  onModuleInit() {
    this.bot.launch();
  }

  async start(ctx: any) {
    this.userService.subscribeUser(ctx.chat.id.toString());
    ctx.reply('Welcome! You have subscribed to daily weather updates.');
  }

  async unsubscribe(ctx: any) {
    this.userService.unsubscribeUser(ctx.chat.id.toString());
    ctx.reply('You have unsubscribed from daily weather updates.');
  }

  async weather(ctx: any) {
    try {
      const weather = await this.getWeather();
      ctx.reply(`Current weather in Mumbai: ${weather}`);
    } catch (error) {
      ctx.reply('Failed to fetch weather data. Please try again later.');
      console.error('Error fetching weather:', error.response?.status, error.message);
    }
  }

  @Cron('0 8 * * *')
  async sendDailyWeather() {
    try {
      const weather = await this.getWeather();
      const subscribedUsers = this.userService.getSubscribedUsers();
      for (const userId of subscribedUsers) {
        await this.bot.telegram.sendMessage(userId, `Daily weather update for Mumbai: ${weather}`);
      }
    } catch (error) {
      console.error('Error sending daily weather:', error.response?.status, error.message);
    }
  }

  private async getWeather(): Promise<string> {
    const apiKey = this.configService.get<string>('WEATHER_API_KEY');
    try {
      const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=Mumbai`);
      const data = response.data;
      return `${data.current.temp_c}°C, ${data.current.condition.text}`;
    } catch (error) {
      console.error('Error fetching weather from API:', error.response?.status, error.message);
      throw error;
    }
  }
}
