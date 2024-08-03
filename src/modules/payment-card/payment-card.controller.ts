import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { AuthenticatedRoleRequest } from 'src/core/middleware/auth-user';
import { CreatePaymentCardDto } from './dtos/create-payment-card.dto';
import { UpdatePaymentCardDto } from './dtos/update-payment-card.dto';
import { PaymentCardService } from './payment-card.service';

@Controller('payment-card')
export class PaymentCardController {
  constructor(private paymentCardService: PaymentCardService) {}

  @Get()
  async getAll(@Res() res: any, @Req() req: AuthenticatedRoleRequest) {
    const result = await this.paymentCardService.getAll(req.user.user.id);
    res.status(result.status).json(result.content);
  }

  @Get('/:id')
  async getOne(
    @Res() res: any,
    @Param('id') id: string,
    @Req() req: AuthenticatedRoleRequest,
  ) {
    const result = await this.paymentCardService.getOne(req.user.user.id, id);
    res.status(result.status).json(result.content);
  }

  @Post()
  async create(
    @Res() res: any,
    @Body() createPaymentCardDto: CreatePaymentCardDto,
    @Req() req: AuthenticatedRoleRequest,
  ) {
    const result = await this.paymentCardService.create(
      req.user.user.id,
      createPaymentCardDto,
    );
    res.status(result.status).json(result.content);
  }

  @Patch()
  async update(
    @Res() res: any,
    @Body() dto: UpdatePaymentCardDto,
    @Req() req: AuthenticatedRoleRequest,
  ) {
    const result = await this.paymentCardService.update(req.user.user.id, dto);
    res.status(result.status).json(result.content);
  }

  @Delete('/:id')
  async delete(
    @Res() res: any,
    @Param('id') id: string,
    @Req() req: AuthenticatedRoleRequest,
  ) {
    const result = await this.paymentCardService.delete(req.user.user.id, id);
    res.status(result.status).json(result.content);
  }
}
