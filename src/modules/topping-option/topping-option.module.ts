import { Module } from '@nestjs/common';
import { ToppingOptionController } from './topping-option.controller';
import { ToppingOptionService } from './topping-option.service';

@Module({
  controllers: [ToppingOptionController],
  providers: [ToppingOptionService]
})
export class ToppingOptionModule {}
