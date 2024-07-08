import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminService {
  private users: any[] = [];
  private blockedUsers: Set<string> = new Set();

  getUsers() {
    return this.users;
  }

  blockUser(id: string) {
    this.blockedUsers.add(id);
    return { status: 'User blocked', id };
  }

  updateSettings(settings: any) {
    return { status: 'Settings updated', settings };
  }
}
