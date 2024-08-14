import { AbstractEntity } from 'src/helper/common/common_entity';
import { Coupon } from 'src/modules/coupon/entities/coupon.entity';
import { Location } from 'src/modules/location/entities/location.entity';
import { OrderRating } from 'src/modules/order-rating/entities/order-rating.entity';
import { PaymentCard } from 'src/modules/payment-card/entities/payment-card.entity';
import { PaymentMethod } from 'src/modules/payment-method/entities/payment-method.entity';
import { User } from 'src/modules/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Order extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: User;

  @Column()
  orderCode: string;

  @Column()
  orderType: string;

  @Column()
  totalAmount: string;

  @Column()
  quantity: number;

  @Column({ nullable: true })
  couponId: string;

  @ManyToOne(() => Coupon)
  @JoinColumn({ name: 'couponId', referencedColumnName: 'id' })
  coupon: Coupon;

  @Column()
  status: string;

  @Column({ nullable: true })
  paymentCardId: string;

  @ManyToOne(() => PaymentCard)
  @JoinColumn({ name: 'paymentCardId', referencedColumnName: 'id' })
  paymentCard: PaymentCard;

  @Column()
  paymentMethodId: string;

  @ManyToOne(() => PaymentMethod)
  @JoinColumn({ name: 'paymentMethodId', referencedColumnName: 'id' })
  paymentMethod: PaymentMethod;

  @Column({ nullable: true })
  discountAmount: string;

  @Column({ nullable: true })
  note: string;

  @Column({ nullable: true })
  orderRatingId: string;

  @OneToOne(() => OrderRating)
  @JoinColumn({ name: 'orderRatingId', referencedColumnName: 'id' })
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
  @JoinColumn({ name: 'locationId', referencedColumnName: 'id' })
  location: Location;
}

export function OrderCreateInput(createOrderDto: {
  userId: string;
  orderCode: string;
  orderType: string;
  totalAmount: string;
  quantity: number;
  couponId: string | null;
  status: string;
  paymentCardId: string | null;
  paymentMethodId: string;
  discountAmount: string | null;
  note: string | null;
  orderRatingId: string | null;
  timeDelivery: Date;
  timeComplete: Date | null;
  isCancel: boolean;
  cancelReason: string | null;
  shipFee: number;
  shipAddress: string;
  shipCoordinates: string | null;
  locationId: string | null;
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

export function OrderUpdateInput(
  currentOrder: Order,
  updateOrderDto: {
    userId?: string;
    orderCode?: string;
    orderType?: string;
    totalAmount?: string;
    quantity?: number;
    couponId?: string | null;
    status?: string;
    paymentCardId?: string | null;
    paymentMethodId?: string;
    discountAmount?: string | null;
    note?: string | null;
    orderRatingId?: string | null;
    timeDelivery?: Date;
    timeComplete?: Date | null;
    isCancel?: boolean;
    cancelReason?: string | null;
    shipFee?: number;
    shipAddress?: string;
    shipCoordinates?: string | null;
    locationId?: string | null;
  },
): Order {
  const updateOrder: Order = {
    ...currentOrder,
  };

  if (updateOrderDto.userId != undefined) {
    updateOrder.userId = updateOrderDto.userId;
  }
  if (updateOrderDto.orderCode != undefined) {
    updateOrder.orderCode = updateOrderDto.orderCode;
  }
  if (updateOrderDto.orderType != undefined) {
    updateOrder.orderType = updateOrderDto.orderType;
  }
  if (updateOrderDto.totalAmount != undefined) {
    updateOrder.totalAmount = updateOrderDto.totalAmount;
  }
  if (updateOrderDto.quantity != undefined) {
    updateOrder.quantity = updateOrderDto.quantity;
  }
  if (updateOrderDto.couponId != undefined) {
    updateOrder.couponId = updateOrderDto.couponId;
  }
  if (updateOrderDto.status != undefined) {
    updateOrder.status = updateOrderDto.status;
  }
  if (updateOrderDto.paymentCardId != undefined) {
    updateOrder.paymentCardId = updateOrderDto.paymentCardId;
  }
  if (updateOrderDto.paymentMethodId != undefined) {
    updateOrder.paymentMethodId = updateOrderDto.paymentMethodId;
  }
  if (updateOrderDto.discountAmount != undefined) {
    updateOrder.discountAmount = updateOrderDto.discountAmount;
  }
  if (updateOrderDto.note != undefined) {
    updateOrder.note = updateOrderDto.note;
  }
  if (updateOrderDto.orderRatingId != undefined) {
    updateOrder.orderRatingId = updateOrderDto.orderRatingId;
  }
  if (updateOrderDto.timeDelivery != undefined) {
    updateOrder.timeDelivery = updateOrderDto.timeDelivery;
  }
  if (updateOrderDto.timeComplete != undefined) {
    updateOrder.timeComplete = updateOrderDto.timeComplete;
  }
  if (updateOrderDto.isCancel != undefined) {
    updateOrder.isCancel = updateOrderDto.isCancel;
  }
  if (updateOrderDto.cancelReason != undefined) {
    updateOrder.cancelReason = updateOrderDto.cancelReason;
  }
  if (updateOrderDto.shipFee != undefined) {
    updateOrder.shipFee = updateOrderDto.shipFee;
  }
  if (updateOrderDto.shipAddress != undefined) {
    updateOrder.shipAddress = updateOrderDto.shipAddress;
  }
  if (updateOrderDto.shipCoordinates != undefined) {
    updateOrder.shipCoordinates = updateOrderDto.shipCoordinates;
  }
  if (updateOrderDto.locationId != undefined) {
    updateOrder.locationId = updateOrderDto.locationId;
  }

  return updateOrder;
}
