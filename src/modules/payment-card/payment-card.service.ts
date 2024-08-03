import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FunctionError } from 'src/helper/common/error_app';
import { ApiResponse } from 'src/helper/common/interfaces';
import { SharedService } from 'src/helper/shared_service';
import { Repository } from 'typeorm';
import { CreatePaymentCardDto } from './dtos/create-payment-card.dto';
import { UpdatePaymentCardDto } from './dtos/update-payment-card.dto';
import {
  PaymentCard,
  PaymentCardCreateInput,
} from './entities/payment-card.entity';

@Injectable()
export class PaymentCardService extends SharedService {
  constructor(
    @InjectRepository(PaymentCard)
    private readonly paymentCardService: Repository<PaymentCard>,
  ) {
    super(PaymentCardService.name);
  }
  async getAll(userId: string): Promise<ApiResponse> {
    return this.handleRequest<PaymentCard[]>(async () => {
      const cards = await this.paymentCardService.find({
        where: {
          isDeleted: false,
          userId: userId,
        },
      });
      return cards;
    });
  }
  async getOne(userId: string, cardId: string): Promise<ApiResponse> {
    return this.handleRequest<PaymentCard>(async () => {
      const card = await this.paymentCardService.findOne({
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
  ): Promise<ApiResponse> {
    return this.handleRequest<PaymentCard>(async () => {
      const findCard = await this.paymentCardService.findOne({
        where: {
          isDeleted: false,
          userId: userId,
          cardNumber: createPaymentCardDto.cardNumber,
        },
      });

      if (findCard !== undefined && findCard !== null) {
        throw new FunctionError(HttpStatus.BAD_REQUEST, 'Existed');
      }

      const paymentCardInput = PaymentCardCreateInput(createPaymentCardDto);

      const createdCard =
        await this.paymentCardService.create(paymentCardInput);

      return createdCard;
    });
  }
  async update(
    userId: string,
    dto: UpdatePaymentCardDto,
  ): Promise<ApiResponse> {
    return this.handleRequest(async () => {});
  }
  async delete(userId: string, menuId: string): Promise<ApiResponse> {
    return this.handleRequest(async () => {});
  }
}
