import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuProduct } from '../menu/entities/menu-product.entity';
import { Menu } from '../menu/entities/menu.entity';
import { MenuModule } from '../menu/menu.module';
import { ProductTopping } from './entities/product-topping.entity';
import { Product } from './entities/product.entity';
import { ToppingOption } from './entities/topping-option.entity';
import { Topping } from './entities/topping.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  imports: [
    TypeOrmModule.forFeature([Menu, MenuProduct, Product, ProductTopping, Topping, ToppingOption]),
    MenuModule
  ],
  exports: [ProductService]
})
export class ProductModule { }
