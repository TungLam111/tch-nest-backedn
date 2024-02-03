import { IsEnum } from 'class-validator';
import { AbstractEntity } from 'src/helper/common/common_entity';
import { ToppingType } from 'src/helper/common/enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Topping extends AbstractEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    @IsEnum(ToppingType)
    toppingType: string;

    @Column({ default: true })
    isRequired: boolean;

    @Column()
    maxSelect: number;

    @Column()
    minSelect: number;
}
