import { Test, TestingModule } from '@nestjs/testing';
import { PointRewardController } from './point-reward.controller';

describe('PointRewardController', () => {
  let controller: PointRewardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PointRewardController],
    }).compile();

    controller = module.get<PointRewardController>(PointRewardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
