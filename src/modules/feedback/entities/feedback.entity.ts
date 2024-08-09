import { AbstractEntity } from 'src/helper/common/common_entity';
import { Column, Entity, PrimaryGeneratedColumn,
 OneToOne, JoinColumn } from 'typeorm';
import { Order } from 'src/modules/order/entities/order.entity';
import { User } from 'src/modules/user/entities/user.entity';

@Entity()
export class Feedback extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  content: string;

  @Column()
  userId: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id'})
  user: User;

  @Column()
  orderId: string;

  @OneToOne(() => Order)
  @JoinColumn({ name: 'orderId', referencedColumnName: 'id'})
  order: Order;

}


export function FeedbackCreateInput(createFeedbackDto: {
        content: string | null, userId: string, orderId: string
    }): Feedback {
  const createDto: Feedback = new Feedback();
    createDto.content = createFeedbackDto.content;
  createDto.userId = createFeedbackDto.userId;
  createDto.orderId = createFeedbackDto.orderId;
  return createDto;
}

export function FeedbackUpdateInput(currentFeedback: Feedback, updateFeedbackDto: {
        content: string | null, userId: string, orderId: string
    }): Feedback {
  return {
    ...currentFeedback,
        content: updateFeedbackDto.content,
    userId: updateFeedbackDto.userId,
    orderId: updateFeedbackDto.orderId,
  };
}

