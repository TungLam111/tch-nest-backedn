import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from "class-validator";
import { PaymentMethodType } from '../../../helper/common/enum';

export class CreatePaymentMethodDto {

    @ApiProperty({ required: true })
    name: string;

    @IsString()
    @ApiProperty({ required: true })
    description: string;

    @ApiProperty({ required: true })
    @IsEnum(PaymentMethodType)
    paymentMethodType: string;
}