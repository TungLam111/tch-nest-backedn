import { ApiProperty } from "@nestjs/swagger";

export class GetStoreListDto {
    @ApiProperty({ nullable: true })
    latitude: number;

    @ApiProperty({ nullable: true })
    longitude: number;
}