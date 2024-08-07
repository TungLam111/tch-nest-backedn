import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderStatus } from 'src/helper/common/enum';
import { FunctionError } from 'src/helper/common/error_app';
import { ApiResponse } from 'src/helper/common/interfaces';
import { SharedService } from 'src/helper/shared_service';
import { Repository } from 'typeorm';
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
    requestDto: CreateOrderDto,
  ): Promise<ApiResponse<Order>> {
    return this.handleRequest<Order>(async () => {
      const totalAmount = 102;
      const quantity = 10;

      const orderDto = OrderCreateInput({
        ...requestDto,
        userId: userId,
        orderCode: this.generateRandomCode(),
        totalAmount: totalAmount,
        quantity: quantity,
        status: OrderStatus.in_process.toString(),
        discountAmount: 0,
        orderRatingId: null,
        timeDelivery: new Date(),
        timeComplete: null,
        isCancel: false,
        cancelReason: null,
        shipFee: 0,
        shipCoordinates: null,
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
}
