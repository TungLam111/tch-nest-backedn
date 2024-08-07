import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { OrderType } from '../../../helper/common/enum';

export class CreateOrderRequest {
  @ApiProperty()
  @IsEnum(OrderType)
  orderType: string;

  @ApiProperty()
  couponId: string;

  @ApiProperty({ nullable: true })
  paymentCardId: string;

  @ApiProperty()
  paymentMethodId: string;

  @ApiProperty({ default: '' })
  note: string;

  @ApiProperty()
  shipAddress: string;

  @ApiProperty()
  locationId: string;

  @ApiProperty()
  latitude: number;

  @ApiProperty()
  longitude: number;
}

export class UpdateStatusOrderRequest {
  @ApiProperty()
  status: string;
}

export class CancelOrderRequest {
  @ApiProperty({ required: true })
  orderId: string;

  @ApiProperty()
  @IsString()
  cancelReason: string;
}
