import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CouponType, OrderStatus } from 'src/helper/common/enum';
import { FunctionError } from 'src/helper/common/error_app';
import { ApiResponse } from 'src/helper/common/interfaces';
import { SharedService } from 'src/helper/shared_service';
import { IsNull, Repository } from 'typeorm';
import { BasketService } from '../basket/basket.service';
import { BasketListResponseDto } from '../basket/dtos/response.dto';
import { VerifyOrderRequest } from '../coupon/dtos/request.dto';
import { VerifyOrderResponse } from '../coupon/dtos/response.dto';
import { Coupon } from '../coupon/entities/coupon.entity';
import {
  CancelOrderDto,
  CreateOrderDto,
  UpdateStatusOrderDto,
} from './dtos/internal.dto';
import { Order, OrderCreateInput } from './entities/order.entity';

@Injectable()
export class OrderService extends SharedService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Coupon)
    private readonly couponRepository: Repository<Coupon>,
    private readonly basketService: BasketService,
  ) {
    super(OrderService.name);
  }

  async getAll(userId: string): Promise<ApiResponse<Order[]>> {
    return this.handleRequest<Order[]>(async () => {
      const orders = await this.orderRepository.find({
        where: {
          isDeleted: false,
          userId: userId,
        },
        order: {
          createdAt: 'DESC',
        },
      });

      if (orders !== undefined && orders !== null) {
        return orders;
      }
      return null;
    });
  }

  async getOne(userId: string, orderId: string): Promise<ApiResponse<Order>> {
    return this.handleRequest<Order>(async () => {
      const order = await this.orderRepository.findOne({
        where: {
          isDeleted: false,
          userId: userId,
          id: orderId,
        },
      });
      return order;
    });
  }

  async addOne(
    userId: string,
    dto: CreateOrderDto,
  ): Promise<ApiResponse<Order>> {
    return this.handleRequest<Order>(async () => {
      const info = await this.getVerifyOrderInfo(userId, {
        orderType: dto.orderType,
        paymentMethodId: dto.paymentMethodId,
        paymentCardId: dto.paymentCardId,
        locationId: dto.locationId,
        latitude: dto.latitude,
        longitude: dto.longitude,
        couponId: dto.couponId,
      });

      const orderDto = OrderCreateInput({
        couponId: dto.couponId,
        paymentMethodId: dto.paymentMethodId,
        shipAddress: dto.shipAddress,
        paymentCardId: dto.paymentCardId,
        userId: userId,
        orderCode: this.generateRandomCode(),
        totalAmount: info.totalCost.toString(),
        quantity: info.basket.results
          .map((e) => e.quantity)
          .reduce((prev, current) => prev + current, 0),
        status: OrderStatus[OrderStatus.in_process],
        discountAmount: info.discount.toString(),
        orderRatingId: null,
        timeDelivery: new Date(),
        timeComplete: null,
        isCancel: false,
        cancelReason: null,
        shipFee: info.deliveryCost,
        shipCoordinates:
          dto.latitude && dto.longitude
            ? `${dto.latitude}, ${dto.longitude}`
            : null,
        orderType: dto.orderType,
        note: dto.note,
        locationId: dto.locationId,
      });

      const createdOrder = await this.orderRepository.save(orderDto);
      return createdOrder;
    });
  }

  async updateStatus(
    userId: string,
    orderId: string,
    statusOrderDto: UpdateStatusOrderDto,
  ): Promise<ApiResponse<Order>> {
    return this.handleRequest<Order>(async () => {
      const order = await this.orderRepository.findOne({
        where: {
          isDeleted: false,
          userId: userId,
          id: orderId,
        },
        order: {
          createdAt: 'DESC',
        },
      });

      if (!order) {
        throw new FunctionError(HttpStatus.BAD_REQUEST, 'Order not found');
      }

      order.status = statusOrderDto.status;

      const updatedOrder = await this.orderRepository.save(order);
      return updatedOrder;
    });
  }

  async cancelOrder(
    userId: string,
    orderId: string,
    dto: CancelOrderDto,
  ): Promise<ApiResponse<Order>> {
    return this.handleRequest<Order>(async () => {
      const orders = await this.orderRepository.findOne({
        where: {
          isDeleted: false,
          userId: userId,
          id: orderId,
        },
        order: {
          createdAt: 'DESC',
        },
      });

      if (!orders) {
        throw new FunctionError(HttpStatus.BAD_REQUEST, 'Order not found');
      }

      orders.isCancel = true;
      orders.cancelReason = dto.cancelReason;

      const canceledOrder = await this.orderRepository.save(orders);
      return canceledOrder;
    });
  }

  generateRandomCode(length: number = 10): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charactersLength);
      result += characters.charAt(randomIndex);
    }

    return result;
  }

  async verifyOrder(
    userId: string,
    dto: VerifyOrderRequest,
  ): Promise<ApiResponse<VerifyOrderResponse>> {
    return this.handleRequest<VerifyOrderResponse>(async () => {
      const data = await this.getVerifyOrderInfo(userId, dto);
      return {
        isValid: data.isValid,
        message: data.message,
        foodCost: data.foodCost,
        discount: data.discount,
        totalCost: data.totalCost,
        deliveryCost: data.deliveryCost,
      };
    });
  }

  async getVerifyOrderInfo(
    userId: string,
    dto: VerifyOrderRequest,
  ): Promise<{
    isValid: boolean;
    message: string;
    foodCost: number;
    totalCost: number;
    deliveryCost: number;
    discount: number;
    basket: BasketListResponseDto;
  }> {
    let coupon;
    if (dto.couponId) {
      coupon = await this.couponRepository.findOne({
        where: [
          {
            isDeleted: false,
            id: dto.couponId,
            isActive: true,
            userId: userId,
          },
          {
            isDeleted: false,
            id: dto.couponId,
            isActive: true,
            userId: IsNull(),
          },
        ],
      });

      if (!coupon)
        throw new FunctionError(HttpStatus.BAD_REQUEST, 'Coupon not found');
    }

    const basketListInfo = await this.basketService.getAllRecentBaskets(userId);
    if (!basketListInfo || basketListInfo.results.length === 0)
      throw new FunctionError(HttpStatus.BAD_REQUEST, 'Basket list is empty');

    let amountDelivery = await this.getDeliveryCost(
      dto.latitude,
      dto.longitude,
    );

    let totalPriceAfterCoupon =
      basketListInfo.foodPrice + (amountDelivery ?? 0);

    let amountCoupon = 0;
    if (coupon) {
      if (coupon.expiryDate < new Date()) {
        return {
          isValid: false,
          message: 'Coupon expired',
          totalCost: totalPriceAfterCoupon,
          discount: amountCoupon,
          foodCost: basketListInfo.foodPrice,
          deliveryCost: amountDelivery,
          basket: basketListInfo,
        };
      }

      if (coupon.couponType === CouponType[CouponType.discount]) {
        if (coupon.minimumSpend && coupon.discountPercentage) {
          if (basketListInfo.foodPrice >= +coupon.minimumSpend) {
            amountCoupon =
              (basketListInfo.foodPrice * coupon.discountPercentage) / 100;
            totalPriceAfterCoupon = totalPriceAfterCoupon - amountCoupon;
          } else {
            return {
              isValid: false,
              message: 'Total food price is not enough to use coupon',
              foodCost: basketListInfo.foodPrice,
              totalCost: totalPriceAfterCoupon,
              deliveryCost: amountDelivery,
              discount: 0,
              basket: basketListInfo,
            };
          }
        } else {
          throw new FunctionError(
            HttpStatus.INTERNAL_SERVER_ERROR,
            'Something wrong. We are checking',
          );
        }
      } else {
        totalPriceAfterCoupon = totalPriceAfterCoupon - amountDelivery;
        amountCoupon = amountDelivery;
      }
    }

    return {
      isValid: true,
      message: 'Valid to create order',
      foodCost: basketListInfo.foodPrice,
      totalCost: totalPriceAfterCoupon,
      deliveryCost: amountDelivery,
      discount: amountCoupon,
      basket: basketListInfo,
    };
  }

  async getDeliveryCost(latitude: number, longitude: number): Promise<number> {
    return 0;
  }
}
