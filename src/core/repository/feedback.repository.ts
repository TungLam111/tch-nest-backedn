import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Feedback } from 'src/modules/feedback/entities/feedback.entity';
import { Repository } from 'typeorm';
import { EntityId } from 'typeorm/repository/EntityId';
import { IBaseRepository } from '../base/base-service';

@Injectable()
export class FeedbackRepository
  extends Repository<Feedback>
  implements IBaseRepository<Feedback>
{
  constructor(
    @InjectRepository(Feedback)
    private feedbackRepository: Repository<Feedback>,
  ) {
    super(
      feedbackRepository.target,
      feedbackRepository.manager,
      feedbackRepository.queryRunner,
    );
  }

  async deleteEntity(data: Feedback): Promise<Feedback> {
    return await this.save({
      ...data,
      isDeleted: true,
      deletedDate: new Date(),
    });
  }

  async findManyByIds(id: [EntityId]): Promise<Feedback[]> {
    throw new Error('Method not implemented.');
  }

  async storeEntity(data: Feedback): Promise<Feedback> {
    return await this.save(data);
  }

  async updateEntity(data: Feedback): Promise<Feedback> {
    return await this.save(data);
  }

  async findOneById(id: EntityId): Promise<Feedback | null> {
    return this.findOneBy({ id: id as string, isDeleted: false });
  }

  async findAllByUserId(userId: string): Promise<Feedback[]> {
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
