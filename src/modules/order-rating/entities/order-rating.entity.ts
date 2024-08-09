import { AbstractEntity } from 'src/helper/common/common_entity';
import { Column, Entity, PrimaryGeneratedColumn,
  } from 'typeorm';

@Entity()
export class OrderRating extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  content: string;

}


export function OrderRatingCreateInput(createOrderRatingDto: {
        content: string
    }): OrderRating {
  const createDto: OrderRating = new OrderRating();
    createDto.content = createOrderRatingDto.content;
  return createDto;
}

export function OrderRatingUpdateInput(currentOrderRating: OrderRating, updateOrderRatingDto: {
        content: string
    }): OrderRating {
  return {
    ...currentOrderRating,
        content: updateOrderRatingDto.content,
  };
}

