import { ApiProperty } from "@nestjs/swagger";

export class SearchProductDto {
    @ApiProperty()
    name: string;
}