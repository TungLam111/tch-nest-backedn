import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AbstractEntity } from '../../../helper/common/common_entity';

@Entity()
export class Product extends AbstractEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    images: string;

    @Column()
    description: string;

    @Column()
    basePrice: number;
}

