import { AbstractEntity } from "src/helper/common/common_entity";
import { Order } from "src/modules/order/entities/order.entity";
import { User } from "src/modules/user/entities/user.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Feedback extends AbstractEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: true })
    content: string;

    @Column()
    userId: string;

    @Column()
    orderId: string;

    @OneToOne(() => User)
    @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
    product: User;

    @OneToOne(() => Order)
    @JoinColumn({ name: 'orderId', referencedColumnName: 'id' })
    order: Order;
}