import { ApiProperty } from "@nestjs/swagger";

export class CreateFeedbackDto {
    @ApiProperty()
    content: string;

    @ApiProperty()
    orderId: string;
}