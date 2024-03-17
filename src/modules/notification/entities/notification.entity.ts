import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AbstractEntity } from '../../../helper/common/common_entity';

@Entity()
export class TchNotification extends AbstractEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    body: string;

    @Column({ nullable: true })
    thumbnail: string; // image

    @Column()
    noti_type: string

    @Column()
    seen_by_users: string // list of user ids who saw this noti

    @Column()
    meta_data: string
}
