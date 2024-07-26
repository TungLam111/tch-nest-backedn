import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FunctionError } from 'src/helper/common/error_app';
import { ApiResponse } from 'src/helper/common/interfaces';
import { SharedService } from 'src/helper/shared_service';
import { Repository } from 'typeorm';
import { Order } from '../order/entities/order.entity';
import { User } from '../user/entities/user.entity';
import { CreateFeedbackDto } from './dtos/create-feedback.dto';
import { Feedback } from './entities/feedback.entity';

@Injectable()
export class FeedbackService extends SharedService {
    constructor(
        @InjectRepository(Feedback) private readonly feedbackRepo: Repository<Feedback>,
        @InjectRepository(Order) private readonly orderRepo: Repository<Order>,
    ) {
        super(FeedbackService.name);
    }

    async getAllFeedbacks(user: User): Promise<ApiResponse> {
        return this.handleRequest(
            async () => {
                const feedbacks = await this.feedbackRepo.find({
                    where: {
                        isDeleted: false,
                        userId: user.id
                    },
                    order: {
                        updatedAt: 'ASC'
                    }
                })
                return feedbacks;
            }
        )
    }

    async createNewFeedback(user: User, createFeedbackDto: CreateFeedbackDto): Promise<ApiResponse> {
        return this.handleRequest(
            async () => {
                const checkOrder = await this.orderRepo.findOne({
                    where: {
                        isDeleted: false,
                        id: createFeedbackDto.orderId,
                    }
                })
                if (!checkOrder) {
                    throw new FunctionError(
                        HttpStatus.BAD_REQUEST,
                        'Order not found'
                    )
                }
                let feedback = new Feedback()
                feedback.content = createFeedbackDto.content;
                feedback.orderId = createFeedbackDto.orderId;
                feedback.userId = user.id;

                feedback = await this.feedbackRepo.save(feedback)

                if (!feedback) {
                    throw new FunctionError(
                        HttpStatus.INTERNAL_SERVER_ERROR,
                        'Fail to create feedback'
                    )
                }
                return feedback;
            },
            HttpStatus.CREATED,
        );
    }

    async delete(user: User, feedbackId: string): Promise<ApiResponse> {
        return this.handleRequest(
            async () => {
                let deleteFeedBack = await this.feedbackRepo.findOne({
                    where: {
                        isDeleted: false,
                        id: feedbackId,
                    }
                })
                if (!deleteFeedBack) {
                    throw new FunctionError(
                        HttpStatus.BAD_REQUEST,
                        'Feedback not found'
                    )
                }
                deleteFeedBack.deletedDate = new Date();
                deleteFeedBack.isDeleted = false;

                deleteFeedBack = await this.feedbackRepo.save(deleteFeedBack)

                if (!deleteFeedBack) {
                    throw new FunctionError(
                        HttpStatus.INTERNAL_SERVER_ERROR,
                        'Fail to delete feedback'
                    )
                }
                return deleteFeedBack;
            },
        );
    }
}
