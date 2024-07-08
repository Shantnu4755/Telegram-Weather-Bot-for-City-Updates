import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { UserService } from './user/user.service';

describe('AppController', () => {
  let appController: AppController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: UserService,
          useValue: {
            getUserById: jest.fn((id: string) => ({ id, name: 'Test User' })),
          },
        },
      ],
    }).compile();

    appController = module.get<AppController>(AppController);
    userService = module.get<UserService>(UserService);
  });

  describe('getUser', () => {
    it('should return user details', async () => {
      const result = { id: '1', name: 'Test User' };
      jest.spyOn(userService, 'getUserById').mockImplementation(() => result);

      expect(await appController.getUser('1')).toBe(result);
    });
  });
});
