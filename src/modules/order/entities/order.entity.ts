import { AbstractEntity } from 'src/helper/common/common_entity';
import { Column, Entity, PrimaryGeneratedColumn,
 ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { Coupon } from 'src/modules/coupon/entities/coupon.entity';
import { Location } from 'src/modules/location/entities/location.entity';
import { OrderRating } from 'src/modules/order-rating/entities/order-rating.entity';
import { PaymentCard } from 'src/modules/payment-card/entities/payment-card.entity';
import { PaymentMethod } from 'src/modules/payment-method/entities/payment-method.entity';
import { User } from 'src/modules/user/entities/user.entity';

@Entity()
export class Order extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id'})
  user: User;

  @Column()
  orderCode: string;

  @Column()
  orderType: string;

  @Column()
  totalAmount: number;

  @Column()
  quantity: number;

  @Column({ nullable: true })
  couponId: string;

  @ManyToOne(() => Coupon)
  @JoinColumn({ name: 'couponId', referencedColumnName: 'id'})
  coupon: Coupon;

  @Column()
  status: string;

  @Column({ nullable: true })
  paymentCardId: string;

  @ManyToOne(() => PaymentCard)
  @JoinColumn({ name: 'paymentCardId', referencedColumnName: 'id'})
  paymentCard: PaymentCard;

  @Column()
  paymentMethodId: string;

  @ManyToOne(() => PaymentMethod)
  @JoinColumn({ name: 'paymentMethodId', referencedColumnName: 'id'})
  paymentMethod: PaymentMethod;

  @Column({ nullable: true })
  discountAmount: number;

  @Column({ nullable: true })
  note: string;

  @Column({ nullable: true })
  orderRatingId: string;

  @OneToOne(() => OrderRating)
  @JoinColumn({ name: 'orderRatingId', referencedColumnName: 'id'})
  orderRating: OrderRating;

  @Column()
  timeDelivery: Date;

  @Column({ nullable: true })
  timeComplete: Date;

  @Column()
  isCancel: boolean;

  @Column({ nullable: true })
  cancelReason: string;

  @Column()
  shipFee: number;

  @Column()
  shipAddress: string;

  @Column({ nullable: true })
  shipCoordinates: string;

  @Column({ nullable: true })
  locationId: string;

  @ManyToOne(() => Location)
  @JoinColumn({ name: 'locationId', referencedColumnName: 'id'})
  location: Location;

}


export function OrderCreateInput(createOrderDto: {
        userId: string, orderCode: string, orderType: string, totalAmount: number, quantity: number, couponId: string | null, status: string, paymentCardId: string | null, paymentMethodId: string, discountAmount: number | null, note: string | null, orderRatingId: string | null, timeDelivery: Date, timeComplete: Date | null, isCancel: boolean, cancelReason: string | null, shipFee: number, shipAddress: string, shipCoordinates: string | null, locationId: string | null
    }): Order {
  const createDto: Order = new Order();
    createDto.userId = createOrderDto.userId;
  createDto.orderCode = createOrderDto.orderCode;
  createDto.orderType = createOrderDto.orderType;
  createDto.totalAmount = createOrderDto.totalAmount;
  createDto.quantity = createOrderDto.quantity;
  createDto.couponId = createOrderDto.couponId;
  createDto.status = createOrderDto.status;
  createDto.paymentCardId = createOrderDto.paymentCardId;
  createDto.paymentMethodId = createOrderDto.paymentMethodId;
  createDto.discountAmount = createOrderDto.discountAmount;
  createDto.note = createOrderDto.note;
  createDto.orderRatingId = createOrderDto.orderRatingId;
  createDto.timeDelivery = createOrderDto.timeDelivery;
  createDto.timeComplete = createOrderDto.timeComplete;
  createDto.isCancel = createOrderDto.isCancel;
  createDto.cancelReason = createOrderDto.cancelReason;
  createDto.shipFee = createOrderDto.shipFee;
  createDto.shipAddress = createOrderDto.shipAddress;
  createDto.shipCoordinates = createOrderDto.shipCoordinates;
  createDto.locationId = createOrderDto.locationId;
  return createDto;
}

export function OrderUpdateInput(currentOrder: Order, updateOrderDto: {
        userId: string, orderCode: string, orderType: string, totalAmount: number, quantity: number, couponId: string | null, status: string, paymentCardId: string | null, paymentMethodId: string, discountAmount: number | null, note: string | null, orderRatingId: string | null, timeDelivery: Date, timeComplete: Date | null, isCancel: boolean, cancelReason: string | null, shipFee: number, shipAddress: string, shipCoordinates: string | null, locationId: string | null
    }): Order {
  return {
    ...currentOrder,
        userId: updateOrderDto.userId,
    orderCode: updateOrderDto.orderCode,
    orderType: updateOrderDto.orderType,
    totalAmount: updateOrderDto.totalAmount,
    quantity: updateOrderDto.quantity,
    couponId: updateOrderDto.couponId,
    status: updateOrderDto.status,
    paymentCardId: updateOrderDto.paymentCardId,
    paymentMethodId: updateOrderDto.paymentMethodId,
    discountAmount: updateOrderDto.discountAmount,
    note: updateOrderDto.note,
    orderRatingId: updateOrderDto.orderRatingId,
    timeDelivery: updateOrderDto.timeDelivery,
    timeComplete: updateOrderDto.timeComplete,
    isCancel: updateOrderDto.isCancel,
    cancelReason: updateOrderDto.cancelReason,
    shipFee: updateOrderDto.shipFee,
    shipAddress: updateOrderDto.shipAddress,
    shipCoordinates: updateOrderDto.shipCoordinates,
    locationId: updateOrderDto.locationId,
  };
}

