import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiResponse } from 'src/helper/common/interfaces';
import { SharedService } from 'src/helper/shared_service';
import { Repository } from 'typeorm';
import { PaymentMethod } from './entities/payment-method.entity';

@Injectable()
export class PaymentMethodService extends SharedService {
  constructor(
    @InjectRepository(PaymentMethod)
    private readonly paymentMethodRepo: Repository<PaymentMethod>,
  ) {
    super(PaymentMethodService.name);
  }
  async getAll(): Promise<ApiResponse> {
    return this.handleRequest<
      {
        id: string;
        name: string;
        paymentMethodType: string;
        description: string;
      }[]
    >(async () => {
      const methods = await this.paymentMethodRepo.find({
        where: {
          isDeleted: false,
        },
      });

      return methods.map((e) => ({
        id: e.id,
        name: e.name,
        paymentMethodType: e.paymentMethodType,
        description: e.description,
      }));
    });
  }
}
