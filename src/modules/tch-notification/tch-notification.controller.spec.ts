import { Test, TestingModule } from '@nestjs/testing';
import { TchNotificationController } from './tch-notification.controller';

describe('TchNotificationController', () => {
  let controller: TchNotificationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TchNotificationController],
    }).compile();

    controller = module.get<TchNotificationController>(TchNotificationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
