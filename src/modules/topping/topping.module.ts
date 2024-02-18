import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToppingOption } from './entities/topping-option.entity';
import { Topping } from './entities/topping.entity';
import { ToppingController } from './topping.controller';
import { ToppingService } from './topping.service';

@Module({
  controllers: [ToppingController],
  providers: [ToppingService],
  imports: [
    TypeOrmModule.forFeature([Topping, ToppingOption]),
  ]
})
export class ToppingModule { }
