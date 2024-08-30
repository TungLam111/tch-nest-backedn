import { AbstractEntity } from 'src/helper/common/common_entity';
import { Menu } from 'src/modules/menu/entities/menu.entity';
import { Product } from 'src/modules/product/entities/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class MenuProduct extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  menuId: string;

  @ManyToOne(() => Menu)
  @JoinColumn({ name: 'menuId', referencedColumnName: 'id' })
  menu: Menu;

  @Column()
  productId: string;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'productId', referencedColumnName: 'id' })
  product: Product;
}

export function MenuProductCreateInput(createMenuProductDto: {
  menuId: string;
  productId: string;
}): MenuProduct {
  const createDto: MenuProduct = new MenuProduct();
  createDto.menuId = createMenuProductDto.menuId;
  createDto.productId = createMenuProductDto.productId;
  return createDto;
}

export function MenuProductUpdateInput(
  currentMenuProduct: MenuProduct,
  updateMenuProductDto: {
    menuId?: string;
    productId?: string;
  },
): MenuProduct {
  const updateMenuProduct: MenuProduct = {
    ...currentMenuProduct,
  };

  if (updateMenuProductDto.menuId != undefined) {
    updateMenuProduct.menuId = updateMenuProductDto.menuId;
  }
  if (updateMenuProductDto.productId != undefined) {
    updateMenuProduct.productId = updateMenuProductDto.productId;
  }

  return updateMenuProduct;
}
