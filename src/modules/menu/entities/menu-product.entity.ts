import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AbstractEntity } from "../../../helper/common/common_entity";
import { Product } from "../../product/entities/product.entity";
import { Menu } from "./menu.entity";

@Entity()
export class MenuProduct extends AbstractEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    menuId: string;

    @Column()
    productId: string;

    @ManyToOne(() => Product)
    @JoinColumn({ name: 'productId', referencedColumnName: 'id' })
    product: Product;

    @ManyToOne(() => Menu)
    @JoinColumn({ name: 'menuId', referencedColumnName: 'id' })
    menu: Menu;
}