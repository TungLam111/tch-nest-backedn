import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/modules/order/entities/order.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super(
      userRepository.target,
      userRepository.manager,
      userRepository.queryRunner,
    );
  }

  async findOneById(id: string): Promise<User | null> {
    return this.findOneBy({ id: id, isDeleted: false });
  }

  async createOne(order: Order): Promise<Order | null> {
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
