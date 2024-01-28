import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CouponModule } from './modules/coupon/coupon.module';
import { OrderModule } from './modules/order/order.module';
import { ProductModule } from './modules/product/product.module';
import { SettingModule } from './modules/setting/setting.module';
import { StoreModule } from './modules/store/store.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [SettingModule, UserModule, OrderModule, StoreModule, ProductModule, CouponModule, StoreModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
