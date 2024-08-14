import { VerifyOrderRequest } from 'src/modules/coupon/dtos/request.dto';

export class CreateOrderDto extends VerifyOrderRequest {
  note: string;

  shipAddress: string;
}

export class UpdateStatusOrderDto {
  status: string;
}

export class CancelOrderDto {
  orderId: string;

  cancelReason: string;
}
