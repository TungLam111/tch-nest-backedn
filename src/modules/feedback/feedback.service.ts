import { HttpStatus, Injectable } from '@nestjs/common';
import { BaseService } from 'src/core/base/base-service';
import { OrderRepository } from 'src/core/repository/order.repository';
import { FunctionError } from 'src/helper/common/error-app';
import { ApiResponse } from 'src/helper/common/interfaces';
import { Repository } from 'typeorm';
import { FeedbackRepository } from '../../core/repository/feedback.repository';
import { User } from '../user/entities/user.entity';
import { CreateFeedbackDto } from './dtos/request';
import { DeleteFeedbackResponse, FeedbackResponse } from './dtos/response';
import { Feedback, FeedbackCreateInput } from './entities/feedback.entity';

@Injectable()
export class FeedbackService extends BaseService<
  Feedback,
  Repository<Feedback>
> {
  constructor(
    private readonly feedbackRepository: FeedbackRepository,
    private readonly orderRepository: OrderRepository,
  ) {
    super(feedbackRepository, FeedbackService.name);
  }

  async getAllFeedbacks(user: User): Promise<ApiResponse<FeedbackResponse[]>> {
    return this.handleRequest<FeedbackResponse[]>(async () => {
      const feedbacks = await this.feedbackRepository.findAllByUserId(user.id);
      return feedbacks.map((e) => ({
        id: e.id,
        content: e.content,
        userId: e.userId,
        orderId: e.orderId,
      }));
    });
  }

  async createNewFeedback(
    user: User,
    createFeedbackDto: CreateFeedbackDto,
  ): Promise<ApiResponse<FeedbackResponse>> {
    return this.handleRequest<FeedbackResponse>(async () => {
      const checkOrder = await this.orderRepository.findOneById(
        createFeedbackDto.orderId,
      );
      if (!checkOrder) {
        throw new FunctionError(HttpStatus.BAD_REQUEST, 'Order not found');
      }

      let feedback: Feedback = FeedbackCreateInput({
        content: createFeedbackDto.content,
        orderId: createFeedbackDto.orderId,
        userId: user.id,
      });

      feedback = await this.feedbackRepository.storeEntity(feedback);

      if (!feedback) {
        throw new FunctionError(
          HttpStatus.INTERNAL_SERVER_ERROR,
          'Fail to create feedback',
        );
      }
      return {
        id: feedback.id,
        content: feedback.content,
        userId: feedback.userId,
        orderId: feedback.orderId,
      };
    }, HttpStatus.CREATED);
  }

  async deleteFeedback(
    _: User,
    feedbackId: string,
  ): Promise<ApiResponse<DeleteFeedbackResponse>> {
    return this.handleRequest<DeleteFeedbackResponse>(async () => {
      let findFeedback = await this.feedbackRepository.findOneById(feedbackId);
      if (!findFeedback) {
        throw new FunctionError(HttpStatus.BAD_REQUEST, 'Feedback not found');
      }

      const deleteFb = await this.feedbackRepository.deleteEntity(findFeedback);

      if (!deleteFb) {
        throw new FunctionError(
          HttpStatus.INTERNAL_SERVER_ERROR,
          'Fail to delete feedback',
        );
      }
      return {
        id: deleteFb.id,
        content: deleteFb.content,
        isDeleted: deleteFb.isDeleted,
        deletedDate: deleteFb.deletedDate,
        userId: deleteFb.userId,
        orderId: deleteFb.orderId,
      };
    });
  }
}
