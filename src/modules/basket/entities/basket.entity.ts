import { AbstractEntity } from 'src/helper/common/common_entity';
import { Column, Entity, PrimaryGeneratedColumn,
 ManyToOne, JoinColumn } from 'typeorm';
import { User } from 'src/modules/user/entities/user.entity';

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
  @JoinColumn({ name: 'userId', referencedColumnName: 'id'})
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
        mealId: string, quantity: number | null, price: string, topping: string, userId: string, mealCategory: string | null, mealName: string | null, mealImage: string | null, isDone: boolean | null
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

export function BasketUpdateInput(currentBasket: Basket, updateBasketDto: {
        mealId: string, quantity: number | null, price: string, topping: string, userId: string, mealCategory: string | null, mealName: string | null, mealImage: string | null, isDone: boolean | null
    }): Basket {
  return {
    ...currentBasket,
        mealId: updateBasketDto.mealId,
    quantity: updateBasketDto.quantity,
    price: updateBasketDto.price,
    topping: updateBasketDto.topping,
    userId: updateBasketDto.userId,
    mealCategory: updateBasketDto.mealCategory,
    mealName: updateBasketDto.mealName,
    mealImage: updateBasketDto.mealImage,
    isDone: updateBasketDto.isDone,
  };
}

