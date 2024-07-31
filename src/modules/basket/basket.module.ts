import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BasketController } from './basket.controller';
import { BasketService } from './basket.service';
import { Basket } from './entities/basket.entity';

@Module({
  controllers: [BasketController],
  providers: [BasketService],
  imports: [TypeOrmModule.forFeature([Basket])],
})
export class BasketModule {}
