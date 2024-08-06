import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AbstractEntity } from 'src/helper/common/common_entity';
@Entity()
export class OrderBasket extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  orderId: string;

  @Column()
  basketId: string;

}


export function OrderBasketCreateInput(createOrderBasketDto: {
        orderId: string, basketId: string
    }): OrderBasket {
  const createDto: OrderBasket = new OrderBasket();
    createDto.orderId = createOrderBasketDto.orderId;
  createDto.basketId = createOrderBasketDto.basketId;
  return createDto;
}

export function OrderBasketUpdateInput(currentOrderBasket: OrderBasket, updateOrderBasketDto: {
        orderId: string, basketId: string
    }): OrderBasket {
  return {
    ...currentOrderBasket,
        orderId: updateOrderBasketDto.orderId,
    basketId: updateOrderBasketDto.basketId,
  };
}

