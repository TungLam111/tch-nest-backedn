import { Test, TestingModule } from '@nestjs/testing';
import { TchNotificationService } from './tch-notification.service';

describe('TchNotificationService', () => {
  let service: TchNotificationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TchNotificationService],
    }).compile();

    service = module.get<TchNotificationService>(TchNotificationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
