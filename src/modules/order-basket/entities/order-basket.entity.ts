import { AbstractEntity } from 'src/helper/common/common_entity';
import { Column, Entity, PrimaryGeneratedColumn,
 ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { Basket } from 'src/modules/basket/entities/basket.entity';
import { Order } from 'src/modules/order/entities/order.entity';

@Entity()
export class OrderBasket extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  orderId: string;

  @ManyToOne(() => Order)
  @JoinColumn({ name: 'orderId', referencedColumnName: 'id'})
  order: Order;

  @Column()
  basketId: string;

  @OneToOne(() => Basket)
  @JoinColumn({ name: 'basketId', referencedColumnName: 'id'})
  basket: Basket;

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
        orderId?: string, basketId?: string
    }): OrderBasket {
  const updateOrderBasket : OrderBasket = {
    ...currentOrderBasket,
  }

      if (updateOrderBasketDto.orderId != undefined) { updateOrderBasket.orderId = updateOrderBasketDto.orderId;}
    if (updateOrderBasketDto.basketId != undefined) { updateOrderBasket.basketId = updateOrderBasketDto.basketId;}
  
  return updateOrderBasket;
}

