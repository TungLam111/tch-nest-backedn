import { ApiProperty } from "@nestjs/swagger";

export class DeleteProductDto {
    @ApiProperty()
    id: string;
}