import { AbstractEntity } from 'src/helper/common/common_entity';
import { Column, Entity, PrimaryGeneratedColumn,
  } from 'typeorm';

@Entity()
export class Product extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  images: string;

  @Column()
  description: string;

  @Column()
  basePrice: number;

}


export function ProductCreateInput(createProductDto: {
        name: string, images: string, description: string, basePrice: number
    }): Product {
  const createDto: Product = new Product();
    createDto.name = createProductDto.name;
  createDto.images = createProductDto.images;
  createDto.description = createProductDto.description;
  createDto.basePrice = createProductDto.basePrice;
  return createDto;
}

export function ProductUpdateInput(currentProduct: Product, updateProductDto: {
        name: string, images: string, description: string, basePrice: number
    }): Product {
  return {
    ...currentProduct,
        name: updateProductDto.name,
    images: updateProductDto.images,
    description: updateProductDto.description,
    basePrice: updateProductDto.basePrice,
  };
}

