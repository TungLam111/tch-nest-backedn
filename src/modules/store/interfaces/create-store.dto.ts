import { ApiProperty } from "@nestjs/swagger";

export class CreateStoreDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    contactPhone: string;

    @ApiProperty()
    address: string;

    @ApiProperty()
    latitude: number;

    @ApiProperty()
    longitude: number;

    @ApiProperty()
    ggPlaceId: string;

    @ApiProperty()
    timeSchedule: string;

    @ApiProperty({ nullable: true })
    images: string[]; // list
}