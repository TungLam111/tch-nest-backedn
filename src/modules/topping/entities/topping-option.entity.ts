import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AbstractEntity } from '../../../helper/common/common_entity';
import { Topping } from './topping.entity';

@Entity()
export class ToppingOption extends AbstractEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    price: number;

    @Column()
    toppingId: string;

    @ManyToOne(() => Topping)
    @JoinColumn({ name: 'toppingId', referencedColumnName: 'id' })
    topping: Topping;
}
