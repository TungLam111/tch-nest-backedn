import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AbstractEntity } from '../../../helper/common/common_entity';
import { ToppingOption } from './topping-option.entity';

@Entity()
export class Topping extends AbstractEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    toppingType: string; // ToppingType

    @Column({ default: true })
    isRequired: boolean;

    @Column()
    maxSelect: number;

    @Column()
    minSelect: number;

    @OneToMany(() => ToppingOption, toppingOption => toppingOption.topping)
    @JoinColumn({ name: 'id', referencedColumnName: 'toppingId' })
    options: ToppingOption[];
}
