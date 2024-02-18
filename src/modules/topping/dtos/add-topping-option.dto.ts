import { ApiProperty } from "@nestjs/swagger";


export class AddToppingOptionDto {
    @ApiProperty()
    toppingOptionName: string;

    @ApiProperty()
    toppingOptionPrice: number;

    @ApiProperty()
    toppingId: string;
}