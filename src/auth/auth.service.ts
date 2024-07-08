import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  // Example method to find or create user
  async findOrCreate(googleId: string, displayName: string, email: string): Promise<any> {
    // Your logic to find or create user in database
    return { googleId, displayName, email };
  }
}
