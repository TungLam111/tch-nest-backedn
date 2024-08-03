import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AbstractEntity } from 'src/helper/common/common_entity';
@Entity()
export class PaymentCard extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  cardHolderName: string;

  @Column()
  cardNumber: string;

  @Column()
  cardType: string;

  @Column()
  expirationDate: Date;

  @Column()
  startDate: Date;

}


export function PaymentCardCreateInput(createPaymentCardDto: {
        userId: string, cardHolderName: string, cardNumber: string, cardType: string, expirationDate: Date, startDate: Date, 
    }): PaymentCard {
  const createDto: PaymentCard = new PaymentCard();
    createDto.userId = createPaymentCardDto.userId;
  createDto.cardHolderName = createPaymentCardDto.cardHolderName;
  createDto.cardNumber = createPaymentCardDto.cardNumber;
  createDto.cardType = createPaymentCardDto.cardType;
  createDto.expirationDate = createPaymentCardDto.expirationDate;
  createDto.startDate = createPaymentCardDto.startDate;
  return createDto;
}

export function PaymentCardUpdateInput(currentPaymentCard: PaymentCard, updatePaymentCardDto: {
        userId: string, cardHolderName: string, cardNumber: string, cardType: string, expirationDate: Date, startDate: Date, 
    }): PaymentCard {
  return {
    ...currentPaymentCard,
        userId: updatePaymentCardDto.userId,
    cardHolderName: updatePaymentCardDto.cardHolderName,
    cardNumber: updatePaymentCardDto.cardNumber,
    cardType: updatePaymentCardDto.cardType,
    expirationDate: updatePaymentCardDto.expirationDate,
    startDate: updatePaymentCardDto.startDate,
  };
}

