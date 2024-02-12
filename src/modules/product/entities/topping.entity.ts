import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AbstractEntity } from '../../../helper/common/common_entity';

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
}
