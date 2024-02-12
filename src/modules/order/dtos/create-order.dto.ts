import { ApiProperty } from "@nestjs/swagger";
import { IsEnum } from "class-validator";
import { OrderType } from "../../../helper/common/enum";

export class CreateOrderDto {
    @ApiProperty()
    @IsEnum(OrderType)
    orderType: string;

    @ApiProperty()
    couponId: string;

    @ApiProperty()
    paymentMethodId: string;

    @ApiProperty()
    note: string;

    @ApiProperty()
    shipAddress: string;

    @ApiProperty()
    latitude: number;

    @ApiProperty()
    longitude: number;
}