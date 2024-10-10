import { AbstractEntity } from 'src/helper/common/common-entity';
import { Topping } from 'src/modules/topping/entities/topping.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ToppingOption extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  price: string;

  @Column()
  toppingId: string;

  @ManyToOne(() => Topping)
  @JoinColumn({ name: 'toppingId', referencedColumnName: 'id' })
  topping: Topping;
}

export function ToppingOptionCreateInput(createToppingOptionDto: {
  name: string;
  price: string;
  toppingId: string;
}): ToppingOption {
  const createDto: ToppingOption = new ToppingOption();
  createDto.name = createToppingOptionDto.name;
  createDto.price = createToppingOptionDto.price;
  createDto.toppingId = createToppingOptionDto.toppingId;
  return createDto;
}

export function ToppingOptionUpdateInput(
  currentToppingOption: ToppingOption,
  updateToppingOptionDto: {
    name?: string;
    price?: string;
    toppingId?: string;
  },
): ToppingOption {
  const updateToppingOption: ToppingOption = {
    ...currentToppingOption,
  };

  if (updateToppingOptionDto.name != undefined) {
    updateToppingOption.name = updateToppingOptionDto.name;
  }
  if (updateToppingOptionDto.price != undefined) {
    updateToppingOption.price = updateToppingOptionDto.price;
  }
  if (updateToppingOptionDto.toppingId != undefined) {
    updateToppingOption.toppingId = updateToppingOptionDto.toppingId;
  }

  return updateToppingOption;
}
