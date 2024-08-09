import { AbstractEntity } from 'src/helper/common/common_entity';
import { Column, Entity, PrimaryGeneratedColumn,
 OneToMany, JoinColumn } from 'typeorm';
import { ToppingOption } from 'src/modules/topping-option/entities/topping-option.entity';

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

  @OneToMany(() => ToppingOption, toppingOption => toppingOption.topping)
  options: ToppingOption[];

}


export function ToppingCreateInput(createToppingDto: {
        name: string, description: string, toppingType: string, isRequired: boolean, maxSelect: number, minSelect: number, options: ToppingOption[]
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

export function ToppingUpdateInput(currentTopping: Topping, updateToppingDto: {
        name: string, description: string, toppingType: string, isRequired: boolean, maxSelect: number, minSelect: number, options: ToppingOption[]
    }): Topping {
  return {
    ...currentTopping,
        name: updateToppingDto.name,
    description: updateToppingDto.description,
    toppingType: updateToppingDto.toppingType,
    isRequired: updateToppingDto.isRequired,
    maxSelect: updateToppingDto.maxSelect,
    minSelect: updateToppingDto.minSelect,
    options: updateToppingDto.options,
  };
}

