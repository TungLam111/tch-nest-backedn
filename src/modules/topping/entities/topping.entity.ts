import { AbstractEntity } from 'src/helper/common/common-entity';
import { ToppingOption } from 'src/modules/topping-option/entities/topping-option.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Topping extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  toppingType: string;

  @Column()
  isRequired: boolean;

  @Column()
  maxSelect: number;

  @Column()
  minSelect: number;

  @OneToMany(() => ToppingOption, (toppingOption) => toppingOption.topping)
  options: ToppingOption[];
}

export function ToppingCreateInput(createToppingDto: {
  name: string;
  description: string;
  toppingType: string;
  isRequired: boolean;
  maxSelect: number;
  minSelect: number;
  options: ToppingOption[];
}): Topping {
  const createDto: Topping = new Topping();
  createDto.name = createToppingDto.name;
  createDto.description = createToppingDto.description;
  createDto.toppingType = createToppingDto.toppingType;
  createDto.isRequired = createToppingDto.isRequired;
  createDto.maxSelect = createToppingDto.maxSelect;
  createDto.minSelect = createToppingDto.minSelect;
  createDto.options = createToppingDto.options;
  return createDto;
}

export function ToppingUpdateInput(
  currentTopping: Topping,
  updateToppingDto: {
    name?: string;
    description?: string;
    toppingType?: string;
    isRequired?: boolean;
    maxSelect?: number;
    minSelect?: number;
    options?: ToppingOption[];
  },
): Topping {
  const updateTopping: Topping = {
    ...currentTopping,
  };

  if (updateToppingDto.name != undefined) {
    updateTopping.name = updateToppingDto.name;
  }
  if (updateToppingDto.description != undefined) {
    updateTopping.description = updateToppingDto.description;
  }
  if (updateToppingDto.toppingType != undefined) {
    updateTopping.toppingType = updateToppingDto.toppingType;
  }
  if (updateToppingDto.isRequired != undefined) {
    updateTopping.isRequired = updateToppingDto.isRequired;
  }
  if (updateToppingDto.maxSelect != undefined) {
    updateTopping.maxSelect = updateToppingDto.maxSelect;
  }
  if (updateToppingDto.minSelect != undefined) {
    updateTopping.minSelect = updateToppingDto.minSelect;
  }
  if (updateToppingDto.options != undefined) {
    updateTopping.options = updateToppingDto.options;
  }

  return updateTopping;
}
