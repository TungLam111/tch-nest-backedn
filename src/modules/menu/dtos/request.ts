import { ApiProperty } from '@nestjs/swagger';

export class CreateMenuDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty({ nullable: true })
  image: string;
}

export class UpdateMenuDto {
  @ApiProperty()
  id: string;

  @ApiProperty({ nullable: true })
  name: string;

  @ApiProperty({ nullable: true })
  image: string;

  @ApiProperty({ nullable: true })
  description: string;
}
