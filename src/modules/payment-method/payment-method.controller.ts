import { Controller, Get, Res } from '@nestjs/common';
import { PaymentMethodService } from './payment-method.service';

@Controller('payment-method')
export class PaymentMethodController {
  constructor(private paymentMethodService: PaymentMethodService) {}

  @Get()
  async getAll(@Res() res: any) {
    const result = await this.paymentMethodService.getAll();
    res.status(result.status).json(result.content);
  }
}
