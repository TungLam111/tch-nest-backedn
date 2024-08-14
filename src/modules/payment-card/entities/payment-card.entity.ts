import { AbstractEntity } from 'src/helper/common/common_entity';
import { Column, Entity, PrimaryGeneratedColumn,
 ManyToOne, JoinColumn } from 'typeorm';
import { User } from 'src/modules/user/entities/user.entity';

@Entity()
export class PaymentCard extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id'})
  user: User;

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

  @Column({ nullable: true })
  issueNumber: string;

  @Column({ nullable: true })
  billingAddressID: string;

}


export function PaymentCardCreateInput(createPaymentCardDto: {
        userId: string, cardHolderName: string, cardNumber: string, cardType: string, expirationDate: Date, startDate: Date, issueNumber: string | null, billingAddressID: string | null
    }): PaymentCard {
  const createDto: PaymentCard = new PaymentCard();
    createDto.userId = createPaymentCardDto.userId;
  createDto.cardHolderName = createPaymentCardDto.cardHolderName;
  createDto.cardNumber = createPaymentCardDto.cardNumber;
  createDto.cardType = createPaymentCardDto.cardType;
  createDto.expirationDate = createPaymentCardDto.expirationDate;
  createDto.startDate = createPaymentCardDto.startDate;
  createDto.issueNumber = createPaymentCardDto.issueNumber;
  createDto.billingAddressID = createPaymentCardDto.billingAddressID;
  return createDto;
}

export function PaymentCardUpdateInput(currentPaymentCard: PaymentCard, updatePaymentCardDto: {
        userId?: string, cardHolderName?: string, cardNumber?: string, cardType?: string, expirationDate?: Date, startDate?: Date, issueNumber?: string | null, billingAddressID?: string | null
    }): PaymentCard {
  const updatePaymentCard : PaymentCard = {
    ...currentPaymentCard,
  }

      if (updatePaymentCardDto.userId != undefined) { updatePaymentCard.userId = updatePaymentCardDto.userId;}
    if (updatePaymentCardDto.cardHolderName != undefined) { updatePaymentCard.cardHolderName = updatePaymentCardDto.cardHolderName;}
    if (updatePaymentCardDto.cardNumber != undefined) { updatePaymentCard.cardNumber = updatePaymentCardDto.cardNumber;}
    if (updatePaymentCardDto.cardType != undefined) { updatePaymentCard.cardType = updatePaymentCardDto.cardType;}
    if (updatePaymentCardDto.expirationDate != undefined) { updatePaymentCard.expirationDate = updatePaymentCardDto.expirationDate;}
    if (updatePaymentCardDto.startDate != undefined) { updatePaymentCard.startDate = updatePaymentCardDto.startDate;}
    if (updatePaymentCardDto.issueNumber != undefined) { updatePaymentCard.issueNumber = updatePaymentCardDto.issueNumber;}
    if (updatePaymentCardDto.billingAddressID != undefined) { updatePaymentCard.billingAddressID = updatePaymentCardDto.billingAddressID;}
  
  return updatePaymentCard;
}

