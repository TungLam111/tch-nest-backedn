import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AbstractEntity } from '../../../helper/common/common_entity';

@Entity()
export class Store extends AbstractEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    contactPhone: string;

    @Column()
    address: string;

    @Column()
    latitude: number;

    @Column()
    longitude: number;

    @Column()
    ggPlaceId: string;

    @Column()
    timeSchedule: string;

    @Column()
    images: string; // list
}
