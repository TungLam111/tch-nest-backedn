import { Module } from '@nestjs/common';
import { OrderBasketController } from './order-basket.controller';
import { OrderBasketService } from './order-basket.service';

@Module({
  controllers: [OrderBasketController],
  providers: [OrderBasketService]
})
export class OrderBasketModule {}
