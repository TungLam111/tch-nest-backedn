import { ApiProperty } from '@nestjs/swagger';

export class UpdatePaymentCardDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  cardHolderName: string;

  @ApiProperty()
  cardNumber: string;

  @ApiProperty()
  cardType: string;

  @ApiProperty()
  expirationDate: Date;

  @ApiProperty()
  startDate: Date;

  @ApiProperty()
  issueNumber: string;

  @ApiProperty()
  billingAddressID: string;
}
