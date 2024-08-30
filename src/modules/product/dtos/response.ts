import { Menu } from 'src/modules/menu/entities/menu.entity';
import { ProductTopping } from 'src/modules/product-topping/entities/product-topping.entity';
import { Product } from '../entities/product.entity';

export class MenusWithProductsResponseDto {
  menu: Menu;
  products: Product[];
}

export class SearchProductResponseDto {
  createdAt: Date;
  updatedAt: Date;
  id: string;
  name: string;
  images: string;
  description: string;
  basePrice: number;
}

export class ProductDetailResponseDto {
  product: Product;
  toppings: ProductTopping[];
}

export class AddMenuProductResponseDto {
  menuId: string;
  productId: string;
}
