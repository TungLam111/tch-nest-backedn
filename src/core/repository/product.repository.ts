import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/modules/order/entities/order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderRepository extends Repository<Order> {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {
    super(
      orderRepository.target,
      orderRepository.manager,
      orderRepository.queryRunner,
    );
  }

  async findAllByUserId(userId: string): Promise<Order[]> {
    return this.find({
      where: {
        isDeleted: false,
        userId: userId,
      },
      order: {
        updatedAt: 'ASC',
      },
    });
  }

  async findOneById(id: string): Promise<Order | null> {
    return this.findOneBy({ id: id, isDeleted: false });
  }

  async createOne(order: Order): Promise<Order> {
    return await this.save(order);
  }

  async updateOne(order: Order): Promise<Order> {
    return await this.save(order);
  }

  async destroy(order: Order): Promise<Order> {
    return await this.save({
      ...order,
      isDeleted: true,
      deletedDate: new Date(),
    });
  }
}
