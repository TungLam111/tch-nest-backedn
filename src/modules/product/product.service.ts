import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FunctionError } from 'src/helper/common/error_app';
import { SharedService } from 'src/helper/shared_service';
import { Repository } from 'typeorm';
import { ApiResponse } from '../../helper/common/interfaces';
import { MenuProduct } from '../menu/entities/menu-product.entity';
import { Menu } from '../menu/entities/menu.entity';
import { MenuService } from '../menu/menu.service';
import { ToppingOption } from '../topping/entities/topping-option.entity';
import { Topping } from '../topping/entities/topping.entity';
import { AddProductToMenuDto } from './dtos/add-product-menu.dto';
import { CreateProductDto } from './dtos/create-product.dto';
import { DeleteProductDto } from './dtos/delete-product.dto';
import { SearchProductDto } from './dtos/search-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { ProductTopping } from './entities/product-topping.entity';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService extends SharedService {
    constructor(
        @InjectRepository(Menu) private readonly menuRepository: Repository<Menu>,
        @InjectRepository(MenuProduct) private readonly menuProductRepository: Repository<MenuProduct>,
        @InjectRepository(Product) private readonly productRepository: Repository<Product>,
        @InjectRepository(ProductTopping) private readonly productToppingRepository: Repository<ProductTopping>,
        @InjectRepository(Topping) private readonly toppingRepository: Repository<Topping>,
        @InjectRepository(ToppingOption) private readonly toppingOptionRepository: Repository<ToppingOption>,
        private menuService: MenuService,
    ) {
        super(ProductService.name);
    }

    async getProductsWithMenu(): Promise<ApiResponse> {
        return this.handleRequest(
            async () => {
                let menusWithProducts = await this.menuRepository
                    .createQueryBuilder('menu')
                    .leftJoinAndSelect('menu.menuProducts', 'menu_product')
                    .leftJoinAndSelect('menu_product.product', 'product')
                    .getMany();

                const menusWithProductsResult = menusWithProducts.map(menu => ({
                    menu,
                    products: menu.menuProducts.map(menuProduct => menuProduct.product),
                }));
                return menusWithProductsResult;
            }
        )
    }

    async searchProduct(searchQuery: SearchProductDto): Promise<ApiResponse> {
        return this.handleRequest(
            async () => {
                const queryBuilder = this.productRepository
                    .createQueryBuilder('product').select([
                        `product."createdAt" as createdAt`,
                        `product."updatedAt" as updatedAt`,
                        `product."id" as id`,
                        `product."name" as name`,
                        `product."images" as images`,
                        `product."description" as description`,
                        `product."basePrice" as basePrice`
                    ])

                if (searchQuery.name) {
                    queryBuilder.andWhere('product.name LIKE :name', {
                        name: `%${searchQuery.name}%`,
                    });
                }

                const result = await queryBuilder.getRawMany()
                return result
            }
        )
    }

    /*
    @params:
        - id
    @return:
        - product
        - product topping
    */
    async getProductDetail(id: string): Promise<ApiResponse> {
        return this.handleRequest(
            async () => {
                const product = await this.productRepository.findOne({
                    where: { isDeleted: false, id: id }
                })
                if (!product) {
                    throw new FunctionError(
                        HttpStatus.BAD_REQUEST,
                        'Product not found'
                    )
                }

                const productTopping = await this.productToppingRepository
                    .createQueryBuilder('product_topping')
                    .innerJoinAndSelect('product_topping.topping', 'topping')
                    .leftJoinAndSelect('topping.options', 'topping_option')
                    .where('product_topping."productId" = :productId', { productId: product.id })
                    .getMany()

                return {
                    product: {
                        ...product,
                        toppings: productTopping
                    }
                }
            }
        )
    }

    /*
    @params:
        - name
        - description
        - images
        - basePrice
        - toppings : topping id list
    */
    async addProduct(productDto: CreateProductDto): Promise<ApiResponse> {
        return this.handleRequest(
            async () => {
                const newProduct = await this.productRepository.save({
                    name: productDto.name,
                    description: productDto.description,
                    images: productDto.images ?? '',
                    basePrice: productDto.basePrice ?? 0,
                })

                if (!newProduct) {
                    throw new FunctionError(
                        HttpStatus.BAD_REQUEST,
                        'Can not create product'
                    )
                }

                let toppings = null
                if (productDto.toppings) {
                    toppings = await this.productToppingRepository.save(
                        productDto.toppings.map((t) => {
                            const prTopping = new ProductTopping()
                            prTopping.productId = newProduct.id
                            prTopping.toppingId = t
                            return prTopping
                        }
                        )
                    )
                }

                return {
                    product: {
                        ...newProduct,
                        toppings: toppings,
                    }
                }
            },
            HttpStatus.CREATED
        )

    }

    /*
    @params:
        - id
        - name
        - description
        - images
        - basePrice
        - toppings : topping id list
    */
    async updateProduct(updateProductDto: UpdateProductDto): Promise<ApiResponse> {
        return this.handleRequest(
            async () => {
                const product = await this.productRepository.findOne({
                    where: { isDeleted: false, id: updateProductDto.id }
                })

                if (!product) {
                    throw new FunctionError(
                        HttpStatus.BAD_REQUEST,
                        'Product not exist'
                    )
                }

                product.basePrice = updateProductDto.basePrice
                product.name = updateProductDto.name
                product.description = updateProductDto.description
                product.images = updateProductDto.images

                const updateProduct = await this.productRepository.save(product)
                if (!updateProduct) {
                    throw new FunctionError(
                        HttpStatus.INTERNAL_SERVER_ERROR,
                        'Fail to update product'
                    )
                }

                let currentToppings = await this.productToppingRepository.find({
                    where: {
                        productId: updateProduct.id,
                        isDeleted: false
                    }
                })

                const currentListTopping = currentToppings.map((t) => t.toppingId)
                const listAdd = updateProductDto.toppings.filter(item => !currentListTopping.includes(item));
                const listRemove = currentListTopping.filter(item => !updateProductDto.toppings.includes(item));

                currentToppings = currentToppings.map((e) => {
                    if (listRemove.includes(e.toppingId)) {
                        return {
                            ...e,
                            isDeleted: true,
                            deletedDate: new Date()
                        }
                    }
                    return e
                })

                currentToppings.push(
                    ...listAdd.map((t) => {
                        const newTopping = new ProductTopping()
                        newTopping.productId = updateProduct.id
                        newTopping.toppingId = t
                        return newTopping;
                    }
                    )
                )

                const updatedToppings = await this.productToppingRepository.save(currentToppings)

                return {
                    product: {
                        ...updateProduct,
                        toppings: [
                            ...updatedToppings,
                        ],
                    }
                }

            }
        )
    }

    /*
    @params:
        - menuId
        - productId
    */
    async addProductToMenu(dto: AddProductToMenuDto): Promise<ApiResponse> {
        return this.handleRequest(
            async () => {
                const menuId = dto.menuId
                const productId = dto.productId

                const findMenu = await this.menuRepository.findOne({
                    where: { isDeleted: false, id: menuId }
                })
                if (!findMenu) {
                    throw new FunctionError(
                        HttpStatus.BAD_REQUEST,
                        'Menu not found'
                    )
                }

                const findProduct = await this.productRepository.findOne({
                    where: { isDeleted: false, id: productId }
                })
                if (!findProduct) {
                    throw new FunctionError(
                        HttpStatus.BAD_REQUEST,
                        'Product not found'
                    )
                }

                const addMenuProduct = await this.menuProductRepository.save({
                    menuId: menuId,
                    productId: productId,
                })

                if (!addMenuProduct) {
                    throw new FunctionError(
                        HttpStatus.INTERNAL_SERVER_ERROR,
                        'Can not add this product to menu'
                    )
                }

            }
        )
    }

    /*
    @params:
        - id
    */
    async deleteProduct(product: DeleteProductDto): Promise<ApiResponse> {
        return this.handleRequest(
            async () => {
                const checkProduct = await this.productRepository.findOne({
                    where: { isDeleted: false, id: product.id }
                })
                if (!checkProduct) {
                    throw new FunctionError(
                        HttpStatus.BAD_REQUEST,
                        'Product not found'
                    )
                }

                const deletedProduct = await this.productRepository.save({
                    ...checkProduct,
                    isDeleted: true,
                    deletedDate: new Date()
                })
                if (!deletedProduct) {
                    throw new FunctionError(
                        HttpStatus.INTERNAL_SERVER_ERROR,
                        'Can not delete this product'

                    )
                }

                // Delete menu-product constraints
                const deletedMenuProduct = await this.menuProductRepository.createQueryBuilder()
                    .update(MenuProduct)
                    .set({ isDeleted: true, deletedDate: new Date() })
                    .where("productId = :id", { id: deletedProduct.id })
                    .execute()
                if (deletedMenuProduct.affected === 0) {
                    throw new FunctionError(
                        HttpStatus.INTERNAL_SERVER_ERROR,
                        'Can not delete menus linked to product'
                    )
                }

                // Delete product-topping constraints
                const deletedProductTopping = await this.productToppingRepository.createQueryBuilder()
                    .update(ProductTopping)
                    .set({ isDeleted: true, deletedDate: new Date() })
                    .where("productId = :id", { id: deletedProduct.id })
                    .execute()
                if (deletedProductTopping.affected === 0) {
                    throw new FunctionError(
                        HttpStatus.INTERNAL_SERVER_ERROR,
                        'Can not delete product topping linked to product'
                    )
                }
                return null;
            }
        )
    }

    async findOne(productId: string): Promise<Product> {
        try {
            const product = this.productRepository.findOne({
                where: {
                    isDeleted: false,
                    id: productId,
                }
            })

            return product;
        } catch (error) {
            this.logger.error(error)
            return null
        }
    }
}
