import { AbstractEntity } from 'src/helper/common/common-entity';
import { MenuProduct } from 'src/modules/menu-product/entities/menu-product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Menu extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  image: string;

  @Column()
  description: string;

  @OneToMany(() => MenuProduct, (menuProduct) => menuProduct.menu)
  menuProducts: MenuProduct[];
}

export function MenuCreateInput(createMenuDto: {
  name: string;
  image: string | null;
  description: string;
  menuProducts: MenuProduct[];
}): Menu {
  const createDto: Menu = new Menu();
  createDto.name = createMenuDto.name;
  createDto.image = createMenuDto.image;
  createDto.description = createMenuDto.description;
  createDto.menuProducts = createMenuDto.menuProducts;
  return createDto;
}

export function MenuUpdateInput(
  currentMenu: Menu,
  updateMenuDto: {
    name?: string;
    image?: string | null;
    description?: string;
    menuProducts?: MenuProduct[];
  },
): Menu {
  const updateMenu: Menu = {
    ...currentMenu,
  };

  if (updateMenuDto.name != undefined) {
    updateMenu.name = updateMenuDto.name;
  }
  if (updateMenuDto.image != undefined) {
    updateMenu.image = updateMenuDto.image;
  }
  if (updateMenuDto.description != undefined) {
    updateMenu.description = updateMenuDto.description;
  }
  if (updateMenuDto.menuProducts != undefined) {
    updateMenu.menuProducts = updateMenuDto.menuProducts;
  }

  return updateMenu;
}
