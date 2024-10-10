import { AbstractEntity } from 'src/helper/common/common-entity';
import { User } from 'src/modules/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: User;

  @Column({ nullable: true })
  mealCategory: string;

  @Column({ nullable: true })
  mealName: string;

  @Column({ nullable: true })
  mealImage: string;

  @Column({ nullable: true })
  isDone: boolean;
}

export function BasketCreateInput(createBasketDto: {
  mealId: string;
  quantity: number | null;
  price: string;
  topping: string;
  userId: string;
  mealCategory: string | null;
  mealName: string | null;
  mealImage: string | null;
  isDone: boolean | null;
}): Basket {
  const createDto: Basket = new Basket();
  createDto.mealId = createBasketDto.mealId;
  createDto.quantity = createBasketDto.quantity;
  createDto.price = createBasketDto.price;
  createDto.topping = createBasketDto.topping;
  createDto.userId = createBasketDto.userId;
  createDto.mealCategory = createBasketDto.mealCategory;
  createDto.mealName = createBasketDto.mealName;
  createDto.mealImage = createBasketDto.mealImage;
  createDto.isDone = createBasketDto.isDone;
  return createDto;
}

export function BasketUpdateInput(
  currentBasket: Basket,
  updateBasketDto: {
    mealId?: string;
    quantity?: number | null;
    price?: string;
    topping?: string;
    userId?: string;
    mealCategory?: string | null;
    mealName?: string | null;
    mealImage?: string | null;
    isDone?: boolean | null;
  },
): Basket {
  const updateBasket: Basket = {
    ...currentBasket,
  };

  if (updateBasketDto.mealId != undefined) {
    updateBasket.mealId = updateBasketDto.mealId;
  }
  if (updateBasketDto.quantity != undefined) {
    updateBasket.quantity = updateBasketDto.quantity;
  }
  if (updateBasketDto.price != undefined) {
    updateBasket.price = updateBasketDto.price;
  }
  if (updateBasketDto.topping != undefined) {
    updateBasket.topping = updateBasketDto.topping;
  }
  if (updateBasketDto.userId != undefined) {
    updateBasket.userId = updateBasketDto.userId;
  }
  if (updateBasketDto.mealCategory != undefined) {
    updateBasket.mealCategory = updateBasketDto.mealCategory;
  }
  if (updateBasketDto.mealName != undefined) {
    updateBasket.mealName = updateBasketDto.mealName;
  }
  if (updateBasketDto.mealImage != undefined) {
    updateBasket.mealImage = updateBasketDto.mealImage;
  }
  if (updateBasketDto.isDone != undefined) {
    updateBasket.isDone = updateBasketDto.isDone;
  }

  return updateBasket;
}
