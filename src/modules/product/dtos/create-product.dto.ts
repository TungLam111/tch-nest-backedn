import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    description: string;

    @ApiProperty({ nullable: true })
    images: string;

    @ApiProperty({ nullable: true })
    basePrice: number
}