import { AbstractEntity } from 'src/helper/common/common_entity';
import { Column, Entity, PrimaryGeneratedColumn,
 ManyToOne, JoinColumn } from 'typeorm';
import { Product } from 'src/modules/product/entities/product.entity';
import { Topping } from 'src/modules/topping/entities/topping.entity';

@Entity()
export class ProductTopping extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  productId: string;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'productId', referencedColumnName: 'id'})
  product: Product;

  @Column()
  toppingId: string;

  @ManyToOne(() => Topping)
  @JoinColumn({ name: 'toppingId', referencedColumnName: 'id'})
  topping: Topping;

}


export function ProductToppingCreateInput(createProductToppingDto: {
        productId: string, toppingId: string
    }): ProductTopping {
  const createDto: ProductTopping = new ProductTopping();
    createDto.productId = createProductToppingDto.productId;
  createDto.toppingId = createProductToppingDto.toppingId;
  return createDto;
}

export function ProductToppingUpdateInput(currentProductTopping: ProductTopping, updateProductToppingDto: {
        productId?: string, toppingId?: string
    }): ProductTopping {
  const updateProductTopping : ProductTopping = {
    ...currentProductTopping,
  }

      if (updateProductToppingDto.productId != undefined) { updateProductTopping.productId = updateProductToppingDto.productId;}
    if (updateProductToppingDto.toppingId != undefined) { updateProductTopping.toppingId = updateProductToppingDto.toppingId;}
  
  return updateProductTopping;
}

