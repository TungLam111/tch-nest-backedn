import { ApiProperty } from "@nestjs/swagger";

export class CreateMenuDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    description: string;

    @ApiProperty({ nullable: true })
    image: string;
}