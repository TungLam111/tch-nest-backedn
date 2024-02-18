import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AbstractEntity } from '../../../helper/common/common_entity';
import { MenuProduct } from './menu-product.entity';

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
