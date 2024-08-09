import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Topping } from './entities/topping.entity';
import { ToppingController } from './topping.controller';
import { ToppingService } from './topping.service';
import { ToppingOption } from '../topping-option/entities/topping-option.entity';

@Module({
  controllers: [ToppingController],
  providers: [ToppingService],
  imports: [
    TypeOrmModule.forFeature([Topping, ToppingOption]),
  ]
})
export class ToppingModule { }
