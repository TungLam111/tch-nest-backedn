import { AbstractEntity } from 'src/helper/common/common_entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Order extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  orderCode: string;

  @Column()
  userId: string;

  @Column()
  orderType: string;

  @Column()
  totalAmount: number;

  @Column()
  quantity: number;

  @Column()
  couponId: string;

  @Column()
  status: string;

  @Column()
  paymentMethodId: string;

  @Column()
  discountAmount: number;

  @Column()
  note: string;

  @Column()
  orderRatingId: string;

  @Column()
  timeDelivery: Date;

  @Column()
  timeComplete: Date;

  @Column()
  isCancel: boolean;

  @Column()
  cancelReason: string;

  @Column()
  shipFee: number;

  @Column()
  shipAddress: string;

  @Column()
  shipCoordinates: string;
}

export function OrderCreateInput(createOrderDto: {
  orderCode: string;
  userId: string;
  orderType: string;
  totalAmount: number;
  quantity: number;
  couponId: string;
  status: string;
  paymentMethodId: string;
  discountAmount: number;
  note: string;
  orderRatingId: string;
  timeDelivery: Date;
  timeComplete: Date;
  isCancel: boolean;
  cancelReason: string;
  shipFee: number;
  shipAddress: string;
  shipCoordinates: string;
}): Order {
  const createDto: Order = new Order();
  createDto.orderCode = createOrderDto.orderCode;
  createDto.userId = createOrderDto.userId;
  createDto.orderType = createOrderDto.orderType;
  createDto.totalAmount = createOrderDto.totalAmount;
  createDto.quantity = createOrderDto.quantity;
  createDto.couponId = createOrderDto.couponId;
  createDto.status = createOrderDto.status;
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
  return createDto;
}

export function OrderUpdateInput(
  currentOrder: Order,
  updateOrderDto: {
    orderCode: string;
    userId: string;
    orderType: string;
    totalAmount: number;
    quantity: number;
    couponId: string;
    status: string;
    paymentMethodId: string;
    discountAmount: number;
    note: string;
    orderRatingId: string;
    timeDelivery: Date;
    timeComplete: Date;
    isCancel: boolean;
    cancelReason: string;
    shipFee: number;
    shipAddress: string;
    shipCoordinates: string;
  },
): Order {
  return {
    ...currentOrder,
    orderCode: updateOrderDto.orderCode,
    userId: updateOrderDto.userId,
    orderType: updateOrderDto.orderType,
    totalAmount: updateOrderDto.totalAmount,
    quantity: updateOrderDto.quantity,
    couponId: updateOrderDto.couponId,
    status: updateOrderDto.status,
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
  };
}
