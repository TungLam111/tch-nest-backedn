import { AbstractEntity } from 'src/helper/common/common-entity';
import { Order } from 'src/modules/order/entities/order.entity';
import { User } from 'src/modules/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Feedback extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  content: string;

  @Column()
  userId: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: User;

  @Column()
  orderId: string;

  @OneToOne(() => Order)
  @JoinColumn({ name: 'orderId', referencedColumnName: 'id' })
  order: Order;
}

export function FeedbackCreateInput(createFeedbackDto: {
  content: string | null;
  userId: string;
  orderId: string;
}): Feedback {
  const createDto: Feedback = new Feedback();
  createDto.content = createFeedbackDto.content;
  createDto.userId = createFeedbackDto.userId;
  createDto.orderId = createFeedbackDto.orderId;
  return createDto;
}

export function FeedbackUpdateInput(
  currentFeedback: Feedback,
  updateFeedbackDto: {
    content?: string | null;
    userId?: string;
    orderId?: string;
  },
): Feedback {
  const updateFeedback: Feedback = {
    ...currentFeedback,
  };

  if (updateFeedbackDto.content != undefined) {
    updateFeedback.content = updateFeedbackDto.content;
  }
  if (updateFeedbackDto.userId != undefined) {
    updateFeedback.userId = updateFeedbackDto.userId;
  }
  if (updateFeedbackDto.orderId != undefined) {
    updateFeedback.orderId = updateFeedbackDto.orderId;
  }

  return updateFeedback;
}
