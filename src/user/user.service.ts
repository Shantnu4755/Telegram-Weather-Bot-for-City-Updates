import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  private users = [
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Jane Doe' },
  ];

  private subscribedUsers: Set<string> = new Set();

  getUserById(id: string) {
    return this.users.find(user => user.id === id);
  }

  createUser(user: any) {
    this.users.push(user);
    return user;
  }

  subscribeUser(userId: string) {
    this.subscribedUsers.add(userId);
  }

  unsubscribeUser(userId: string) {
    this.subscribedUsers.delete(userId);
  }

  getSubscribedUsers(): string[] {
    return Array.from(this.subscribedUsers);
  }
}
