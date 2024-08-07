import { ApiProperty } from '@nestjs/swagger';

export class LoginRequestDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}

export class CreateAccountRequestDto {
  @ApiProperty({ nullable: false })
  email: string;

  @ApiProperty({ nullable: false })
  password: string;

  @ApiProperty({ nullable: false })
  name: string;

  @ApiProperty({ nullable: false })
  phoneNumber: string;
}
