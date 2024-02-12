import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AbstractEntity } from '../../../helper/common/common_entity';

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
}
