import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum } from "class-validator";
import { Sex } from "../../../helper/common/enum";

export class CreateUserDto {
    @ApiProperty({
        required: true
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        required: true
    })
    password: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    phoneNumber: string;

    @ApiProperty()
    @IsEnum(Sex)
    sex: string;
}