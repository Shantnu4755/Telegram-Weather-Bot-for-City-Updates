import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthService } from './auth/auth.service';
import { GoogleStrategy } from './auth/google.strategy';
import { AdminModule } from './admin/admin.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'google' }),
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AuthService, GoogleStrategy],
})
export class AppModule {}
