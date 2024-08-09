import { Module } from '@nestjs/common';
import { ProductToppingController } from './product-topping.controller';
import { ProductToppingService } from './product-topping.service';

@Module({
  controllers: [ProductToppingController],
  providers: [ProductToppingService]
})
export class ProductToppingModule {}
