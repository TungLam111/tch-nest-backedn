import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AbstractEntity } from '../../../helper/common/common_entity';
import { Product } from './product.entity';
import { Topping } from './topping.entity';


@Entity()
export class ProductTopping extends AbstractEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    productId: string;

    @Column()
    toppingId: string;

    @ManyToOne(() => Product)
    @JoinColumn({ name: 'productId', referencedColumnName: 'id' })
    product: Product;

    @ManyToOne(() => Topping)
    @JoinColumn({ name: 'toppingId', referencedColumnName: 'id' })
    topping: Topping;
}
