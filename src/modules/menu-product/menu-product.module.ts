import { Module } from '@nestjs/common';
import { MenuProductController } from './menu-product.controller';
import { MenuProductService } from './menu-product.service';

@Module({
  controllers: [MenuProductController],
  providers: [MenuProductService]
})
export class MenuProductModule {}
