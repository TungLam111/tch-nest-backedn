import { IsEnum } from 'class-validator';
import { AbstractEntity } from 'src/helper/common/common_entity';
import { PaymentMethodType } from 'src/helper/common/enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PaymentMethod extends AbstractEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    @IsEnum(PaymentMethodType)
    paymentMethodType: string;
}
