import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

export class SignupUserDto {
    @ApiProperty({
        required: true
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        required: true
    })
    password: string;
}

export class VerifySignupUserDto {
    @ApiProperty({
        required: true
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        required: true
    })
    password: string;

    @ApiProperty({
        required: true
    })
    code: string;
}