import { ApiProperty } from "@nestjs/swagger";

export class SaveLocationDto {
    @ApiProperty()
    address: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    latitude: number;

    @ApiProperty()
    longitude: number;

    @ApiProperty()
    ggPlaceId: string;
}

export class CreateLocationDto extends SaveLocationDto { }
