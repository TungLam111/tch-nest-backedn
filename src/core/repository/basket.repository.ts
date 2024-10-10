import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Basket } from 'src/modules/basket/entities/basket.entity';
import { Repository } from 'typeorm';
import { EntityId } from 'typeorm/repository/EntityId';
import { IBaseRepository } from '../base/base-service';

@Injectable()
export class BasketRepository
  extends Repository<Basket>
  implements IBaseRepository<Basket>
{
  constructor(
    @InjectRepository(Basket)
    private basketRepository: Repository<Basket>,
  ) {
    super(
      basketRepository.target,
      basketRepository.manager,
      basketRepository.queryRunner,
    );
  }

  findManyByIds(id: [EntityId]): Promise<Basket[]> {
    throw new Error('Method not implemented.');
  }

  async storeEntity(data: Basket): Promise<Basket> {
    return await this.save(data);
  }

  async updateEntity(data: Basket): Promise<Basket> {
    return await this.save(data);
  }

  async deleteEntity(data: Basket): Promise<Basket> {
    return await this.save({
      ...data,
      isDeleted: true,
      deletedDate: new Date(),
    });
  }

  async findOneById(id: string): Promise<Basket | null> {
    return this.findOneBy({ id: id, isDeleted: false });
  }

  async findOneNotDoneById(id: string): Promise<Basket | null> {
    return this.findOneBy({ id: id, isDeleted: false, isDone: false });
  }

  async findAllRecentBasketsByUserId(userId: string): Promise<Basket[]> {
    const baskets = await this.find({
      where: {
        userId: userId,
        isDeleted: false,
        isDone: false,
      },
      order: {
        createdAt: 'DESC',
      },
    });
    return baskets;
  }

  async findAllByUserId(userId: string): Promise<Basket[]> {
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
}
