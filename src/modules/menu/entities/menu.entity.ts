import { AbstractEntity } from 'src/helper/common/common_entity';
import { Column, Entity, PrimaryGeneratedColumn,
 OneToMany, JoinColumn } from 'typeorm';
import { MenuProduct } from 'src/modules/menu-product/entities/menu-product.entity';

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

  @OneToMany(() => MenuProduct, menuProduct => menuProduct.menu)
  menuProducts: MenuProduct[];

}


export function MenuCreateInput(createMenuDto: {
        name: string, image: string | null, description: string, menuProducts: MenuProduct[]
    }): Menu {
  const createDto: Menu = new Menu();
    createDto.name = createMenuDto.name;
  createDto.image = createMenuDto.image;
  createDto.description = createMenuDto.description;
  createDto.menuProducts = createMenuDto.menuProducts;
  return createDto;
}

export function MenuUpdateInput(currentMenu: Menu, updateMenuDto: {
        name: string, image: string | null, description: string, menuProducts: MenuProduct[]
    }): Menu {
  return {
    ...currentMenu,
        name: updateMenuDto.name,
    image: updateMenuDto.image,
    description: updateMenuDto.description,
    menuProducts: updateMenuDto.menuProducts,
  };
}

