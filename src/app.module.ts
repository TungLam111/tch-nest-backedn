import * as Joi from '@hapi/joi';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import databaseConfig from './core/config/database/database';
import { AuthMiddleware } from './core/middleware/auth-middleware';
import { AuthModule } from './modules/auth/auth.module';
import { BasketModule } from './modules/basket/basket.module';
import { CouponModule } from './modules/coupon/coupon.module';
import { FeedbackModule } from './modules/feedback/feedback.module';
import { MenuModule } from './modules/menu/menu.module';
import { NotificationModule } from './modules/notification/notification.module';
import { OrderModule } from './modules/order/order.module';
import { PaymentCardModule } from './modules/payment-card/payment-card.module';
import { ProductModule } from './modules/product/product.module';
import { RatingModule } from './modules/rating/rating.module';
import { SettingModule } from './modules/setting/setting.module';
import { StoreModule } from './modules/store/store.module';
import { ToppingModule } from './modules/topping/topping.module';
import { UserModule } from './modules/user/user.module';
import { PaymentMethodModule } from './modules/payment-method/payment-method.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_DB: Joi.string().required(),
        POSTGRES_SSL: Joi.boolean().required(),
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (): Promise<TypeOrmModuleOptions> => {
        return databaseConfig;
      },
    }),
    JwtModule,
    AuthModule,
    UserModule,
    SettingModule,
    OrderModule,
    StoreModule,
    ProductModule,
    CouponModule,
    StoreModule,
    MenuModule,
    ToppingModule,
    RatingModule,
    NotificationModule,
    FeedbackModule,
    BasketModule,
    PaymentCardModule,
    PaymentMethodModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'auth/login', method: RequestMethod.POST },
        {
          path: 'auth/create-account',
          method: RequestMethod.POST,
        },
      )
      .forRoutes('*');
  }
}
