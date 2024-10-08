import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/core/base/base-service';
import { FunctionError } from 'src/helper/common/error-app';
import { ApiResponse } from 'src/helper/common/interfaces';
import { Repository } from 'typeorm';
import { CreatePaymentCardDto } from './dtos/create-payment-card.dto';
import { UpdatePaymentCardDto } from './dtos/update-payment-card.dto';
import {
  PaymentCard,
  PaymentCardCreateInput,
  PaymentCardUpdateInput,
} from './entities/payment-card.entity';

@Injectable()
export class PaymentCardService extends BaseService<
  PaymentCard,
  Repository<PaymentCard>
> {
  constructor(
    @InjectRepository(PaymentCard)
    private readonly paymentCardRepo: Repository<PaymentCard>,
  ) {
    super(paymentCardRepo, PaymentCardService.name);
  }
  async getAll(userId: string): Promise<ApiResponse<PaymentCard[]>> {
    return this.handleRequest<PaymentCard[]>(async () => {
      const cards = await this.paymentCardRepo.find({
        where: {
          isDeleted: false,
          userId: userId,
        },
      });
      return cards;
    });
  }

  async getOne(
    userId: string,
    cardId: string,
  ): Promise<ApiResponse<PaymentCard>> {
    return this.handleRequest<PaymentCard>(async () => {
      const card = await this.paymentCardRepo.findOne({
        where: {
          isDeleted: false,
          id: cardId,
          userId: userId,
        },
      });
      return card;
    });
  }

  async create(
    userId: string,
    createPaymentCardDto: CreatePaymentCardDto,
  ): Promise<ApiResponse<PaymentCard>> {
    return this.handleRequest<PaymentCard>(async () => {
      const findCard = await this.paymentCardRepo.findOne({
        where: {
          isDeleted: false,
          userId: userId,
          cardNumber: createPaymentCardDto.cardNumber,
        },
      });

      if (findCard !== undefined && findCard !== null) {
        throw new FunctionError(HttpStatus.BAD_REQUEST, 'Existed');
      }

      const paymentCardInput = PaymentCardCreateInput({
        ...createPaymentCardDto,
        userId: userId,
      });
      const createdCard = await this.paymentCardRepo.save(paymentCardInput);

      console.log(JSON.stringify(createdCard));

      return createdCard;
    });
  }

  async update(
    userId: string,
    cardId: string,
    dto: UpdatePaymentCardDto,
  ): Promise<ApiResponse<PaymentCard>> {
    return this.handleRequest<PaymentCard>(async () => {
      const findCard = await this.paymentCardRepo.findOne({
        where: {
          isDeleted: false,
          userId: userId,
          id: cardId,
        },
      });

      if (!findCard) {
        throw new FunctionError(HttpStatus.BAD_REQUEST, 'Bad request');
      }

      const paymentCardInput = PaymentCardUpdateInput(findCard, dto);
      const updateCard = await this.paymentCardRepo.save(paymentCardInput);
      return updateCard;
    });
  }

  async delete(
    userId: string,
    cardId: string,
  ): Promise<ApiResponse<PaymentCard>> {
    return this.handleRequest<PaymentCard>(async () => {
      const findCard = await this.paymentCardRepo.findOne({
        where: {
          isDeleted: false,
          userId: userId,
          id: cardId,
        },
      });

      if (!findCard) {
        throw new FunctionError(HttpStatus.BAD_REQUEST, 'Bad request');
      }

      findCard.isDeleted = true;
      findCard.deletedDate = new Date();

      const deletedCard = await this.paymentCardRepo.save(findCard);
      return deletedCard;
    });
  }
}
