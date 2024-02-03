import { Module } from '@nestjs/common';
import { PointRewardController } from './point-reward.controller';
import { PointRewardService } from './point-reward.service';

@Module({
  controllers: [PointRewardController],
  providers: [PointRewardService]
})
export class PointRewardModule {}
