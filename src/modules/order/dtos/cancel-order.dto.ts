import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CancelOrderDto {

    @ApiProperty({ required: true })
    orderId: string;

    @ApiProperty()
    @IsString()
    cancelReason: string;
}