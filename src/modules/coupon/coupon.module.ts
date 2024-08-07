import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BasketModule } from '../basket/basket.module';
import { CouponController } from './coupon.controller';
import { CouponService } from './coupon.service';
import { Coupon } from './entities/coupon.entity';

@Module({
  controllers: [CouponController],
  providers: [CouponService],
  imports: [TypeOrmModule.forFeature([Coupon]), BasketModule],
})
export class CouponModule {}
