import { AbstractEntity } from 'src/helper/common/common_entity';
import { Column, Entity, PrimaryGeneratedColumn,
 ManyToOne, JoinColumn } from 'typeorm';
import { Topping } from 'src/modules/topping/entities/topping.entity';

@Entity()
export class ToppingOption extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  toppingId: string;

  @ManyToOne(() => Topping)
  @JoinColumn({ name: 'toppingId', referencedColumnName: 'id'})
  topping: Topping;

}


export function ToppingOptionCreateInput(createToppingOptionDto: {
        name: string, price: number, toppingId: string
    }): ToppingOption {
  const createDto: ToppingOption = new ToppingOption();
    createDto.name = createToppingOptionDto.name;
  createDto.price = createToppingOptionDto.price;
  createDto.toppingId = createToppingOptionDto.toppingId;
  return createDto;
}

export function ToppingOptionUpdateInput(currentToppingOption: ToppingOption, updateToppingOptionDto: {
        name: string, price: number, toppingId: string
    }): ToppingOption {
  return {
    ...currentToppingOption,
        name: updateToppingOptionDto.name,
    price: updateToppingOptionDto.price,
    toppingId: updateToppingOptionDto.toppingId,
  };
}

