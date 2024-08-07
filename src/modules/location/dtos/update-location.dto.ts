import { ApiProperty } from "@nestjs/swagger";
import { SaveLocationDto } from "./create-location.dto";


export class UpdateLocationDto extends SaveLocationDto {
    @ApiProperty()
    id: string;
}