import { ApiProperty } from "@nestjs/swagger";

export class UpdateProductDto {
    @ApiProperty()
    id: string;

    @ApiProperty({ nullable: true })
    name: string;

    @ApiProperty({ nullable: true })
    description: string;

    @ApiProperty({ nullable: true })
    images: string;

    @ApiProperty({ nullable: true })
    basePrice: number

    @ApiProperty({ nullable: true, default: [] })
    toppings: string[]
}