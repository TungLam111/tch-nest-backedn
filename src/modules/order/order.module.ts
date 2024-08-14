import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BasketModule } from '../basket/basket.module';
import { Coupon } from '../coupon/entities/coupon.entity';
import { Order } from './entities/order.entity';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  controllers: [OrderController],
  providers: [OrderService],
  imports: [TypeOrmModule.forFeature([Order, Coupon]), BasketModule],
})
export class OrderModule {}
