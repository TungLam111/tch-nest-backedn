import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsString } from "class-validator";
import { FavoriteProductAction } from "src/helper/common/enum";

export class LikeProductDto {
    @ApiProperty({
        required: true
    })
    @IsString()
    productId: string;

    @IsEnum(FavoriteProductAction)
    type: FavoriteProductAction;
}