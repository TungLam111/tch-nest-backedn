import { AbstractEntity } from 'src/helper/common/common_entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
