import { User } from 'src/modules/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AbstractEntity } from '../../../helper/common/common_entity';

@Entity()
export class Basket extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  mealId: string;

  @Column({ nullable: true })
  quantity: number;

  @Column()
  price: string;

  @Column()
  topping: string;

  @Column()
  userId: string;

  @Column({ nullable: true })
  mealCategory: string;

  @Column({ nullable: true })
  mealName: string;

  @Column({ nullable: true })
  mealImage: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: User;
}
