import { IsEmail, IsEnum } from 'class-validator';
import { AbstractEntity } from 'src/helper/common/common_entity';
import { Sex } from 'src/helper/common/enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends AbstractEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    @IsEmail()
    email: string;

    @Column()
    password: string;

    @Column()
    name: string;

    @Column()
    dob: string;

    @Column({ nullable: true })
    phoneNumber: string;

    @Column({ nullable: true })
    @IsEnum(Sex)
    sex: string;
}
