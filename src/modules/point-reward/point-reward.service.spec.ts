import { Test, TestingModule } from '@nestjs/testing';
import { PointRewardService } from './point-reward.service';

describe('PointRewardService', () => {
  let service: PointRewardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PointRewardService],
    }).compile();

    service = module.get<PointRewardService>(PointRewardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
