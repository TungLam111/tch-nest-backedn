import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MenuProduct } from 'src/modules/menu-product/entities/menu-product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MenuProductRepository extends Repository<MenuProduct> {
  constructor(
    @InjectRepository(MenuProduct)
    private menuProductRepository: Repository<MenuProduct>,
  ) {
    super(
      menuProductRepository.target,
      menuProductRepository.manager,
      menuProductRepository.queryRunner,
    );
  }

  async findOneById(id: string): Promise<MenuProduct | null> {
    return this.findOneBy({ id: id, isDeleted: false });
  }

  async createOne(menuProduct: MenuProduct): Promise<MenuProduct> {
    return await this.save(menuProduct);
  }

  async updateOne(menuProduct: MenuProduct): Promise<MenuProduct> {
    return await this.save(menuProduct);
  }

  async destroy(menuProduct: MenuProduct): Promise<MenuProduct> {
    return await this.save({
      ...menuProduct,
      isDeleted: true,
      deletedDate: new Date(),
    });
  }
}
