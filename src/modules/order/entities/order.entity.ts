import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AbstractEntity } from '../../../helper/common/common_entity';

@Entity()
export class Order extends AbstractEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    orderCode: string; // unique

    @Column()
    userId: string;

    @Column()
    orderType: string;

    @Column()
    totalAmount: number;

    @Column()
    quantity: number;

    @Column({ nullable: true })
    couponId: string;

    @Column()
    status: string; // OrderStatus

    @Column()
    paymentMethodId: string;

    @Column({ nullable: true })
    discountAmount: number;

    @Column({ nullable: true })
    note: string;

    @Column({ nullable: true })
    orderRatingId: string;

    @Column({ nullable: true })
    timeDelivery: Date

    @Column({ nullable: true })
    timeComplete: Date

    @Column({ default: false })
    isCancel: boolean;

    @Column({ nullable: true })
    cancelReason: string;

    @Column({ nullable: true })
    shipFee: number;

    @Column({ nullable: true })
    shipAddress: string;

    @Column({ nullable: true })
    shipCoordinates: string; // '1.111, 2.222' - separated by comma
}
