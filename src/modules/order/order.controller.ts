import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { AuthenticatedRoleRequest } from 'src/core/middleware/auth-user';
import { VerifyOrderRequest } from '../coupon/dtos/request.dto';
import {
  CancelOrderRequest,
  CreateOrderRequest,
  UpdateStatusOrderRequest,
} from './dtos/request';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get()
  async getAll(@Res() res: any, @Req() req: AuthenticatedRoleRequest) {
    const result = await this.orderService.getAll(req.user.user.id);
    res.status(result.status).json(result.content);
  }

  @Get(':id')
  async getOne(
    @Res() res: any,
    @Req() req: AuthenticatedRoleRequest,
    @Param('id') orderId: string,
  ) {
    const result = await this.orderService.getOne(req.user.user.id, orderId);

    console.log(JSON.stringify(result.content));
    res.status(result.status).json(result.content);
  }

  @Post()
  async addOne(
    @Res() res: any,
    @Req() req: AuthenticatedRoleRequest,
    @Body() requestBody: CreateOrderRequest,
  ) {
    const result = await this.orderService.addOne(req.user.user.id, {
      ...requestBody,
    });
    res.status(result.status).json(result.content);
  }

  @Put(':id/status')
  async updateOne(
    @Res() res: any,
    @Req() req: AuthenticatedRoleRequest,
    @Param('id') orderId: string,
    @Body() requestBody: UpdateStatusOrderRequest,
  ) {
    const result = await this.orderService.updateStatus(
      req.user.user.id,
      orderId,
      {
        ...requestBody,
      },
    );
    res.status(result.status).json(result.content);
  }

  @Put(':id/cancel')
  async cancelOrder(
    @Res() res: any,
    @Req() req: AuthenticatedRoleRequest,
    @Param('id') orderId: string,
    @Body() requestBody: CancelOrderRequest,
  ) {
    const result = await this.orderService.cancelOrder(
      req.user.user.id,
      orderId,
      {
        ...requestBody,
      },
    );
    res.status(result.status).json(result.content);
  }

  @Post('check')
  async useCoupon(
    @Res() res: any,
    @Req() req: AuthenticatedRoleRequest,
    @Body() requestBody: VerifyOrderRequest,
  ) {
    const result = await this.orderService.verifyOrder(
      req.user.user.id,
      requestBody,
    );
    res.status(result.status).json(result.content);
  }
}
