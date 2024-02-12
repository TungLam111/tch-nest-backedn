import { ApiProperty } from "@nestjs/swagger";

export class AddProductToMenuDto {
    @ApiProperty()
    productId: string;

    @ApiProperty()
    menuId: string;
}