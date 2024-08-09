import { Module } from '@nestjs/common';
import { OrderRatingController } from './order-rating.controller';
import { OrderRatingService } from './order-rating.service';

@Module({
  controllers: [OrderRatingController],
  providers: [OrderRatingService]
})
export class OrderRatingModule {}
