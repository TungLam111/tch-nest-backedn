import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AbstractEntity } from "../../../helper/common/common_entity";
import { Product } from "../../product/entities/product.entity";
import { Order } from "./order.entity";

@Entity()
export class OrderProduct extends AbstractEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    orderId: string;

    @Column()
    productId: string;

    @Column()
    quantity: number;

    @ManyToOne(() => Product)
    @JoinColumn({ name: 'productId', referencedColumnName: 'id' })
    product: Product;

    @ManyToOne(() => Order)
    @JoinColumn({ name: 'orderId', referencedColumnName: 'id' })
    order: Order;
}