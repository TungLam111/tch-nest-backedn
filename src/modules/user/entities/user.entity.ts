import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AbstractEntity } from '../../../helper/common/common_entity';

@Entity()
export class User extends AbstractEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    name: string;

    @Column({ nullable: true })
    dob: string;

    @Column({ nullable: true })
    phoneNumber: string;

    @Column({ nullable: true })
    sex: string;

    @Column({ nullable: true })
    likeProducts: string;
}
