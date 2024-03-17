import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiResponse, ResponseData } from '../../helper/common/interfaces';
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
export class ProductService {
    constructor(
        @InjectRepository(Menu) private readonly menuRepository: Repository<Menu>,
        @InjectRepository(MenuProduct) private readonly menuProductRepository: Repository<MenuProduct>,
        @InjectRepository(Product) private readonly productRepository: Repository<Product>,
        @InjectRepository(ProductTopping) private readonly productToppingRepository: Repository<ProductTopping>,
        @InjectRepository(Topping) private readonly toppingRepository: Repository<Topping>,
        @InjectRepository(ToppingOption) private readonly toppingOptionRepository: Repository<ToppingOption>,
        private menuService: MenuService,
    ) { }

    private logger = new Logger(ProductService.name);

    async getProductsWithMenu(): Promise<ApiResponse> {
        const responseData = new ResponseData();
        try {
            let menusWithProducts = await this.menuRepository
                .createQueryBuilder('menu')
                .leftJoinAndSelect('menu.menuProducts', 'menu_product')
                .leftJoinAndSelect('menu_product.product', 'product')
                .getMany();

            const menusWithProductsResult = menusWithProducts.map(menu => ({
                menu,
                products: menu.menuProducts.map(menuProduct => menuProduct.product),
            }));

            responseData.appData = menusWithProductsResult
            responseData.hasError = false
            return {
                status: HttpStatus.OK,
                content: responseData,
            }
        } catch (e) {
            this.logger.error(e)
            return {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                content: null
            }
        }
    }

    async searchProduct(searchQuery: SearchProductDto): Promise<ApiResponse> {
        const responseData = new ResponseData();
        try {
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
            responseData.appData = result
            responseData.hasError = false
            return {
                status: HttpStatus.OK,
                content: responseData,
            }
        } catch (e) {
            this.logger.error(e)
            return {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                content: null
            }
        }
    }

    /*
    @params:
        - id
    @return:
        - product
        - product topping
    */
    async getProductDetail(id: string): Promise<ApiResponse> {
        const responseData = new ResponseData();
        try {
            const product = await this.productRepository.findOne({
                where: { isDeleted: false, id: id }
            })
            if (!product) {
                return {
                    status: HttpStatus.BAD_REQUEST,
                    content: responseData
                }
            }

            const productTopping = await this.productToppingRepository
                .createQueryBuilder('product_topping')
                .innerJoinAndSelect('product_topping.topping', 'topping')
                .leftJoinAndSelect('topping.options', 'topping_option')
                .where('product_topping."productId" = :productId', { productId: product.id })
                .getMany()

            responseData.hasError = false
            responseData.appData = {
                product: {
                    ...product,
                    toppings: productTopping
                }
            }
            return {
                status: HttpStatus.OK,
                content: responseData,
            }
        } catch (e) {
            this.logger.error(e)
            return {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                content: null
            }
        }
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
        const responseData = new ResponseData();
        try {
            const newProduct = await this.productRepository.save({
                name: productDto.name,
                description: productDto.description,
                images: productDto.images ?? '',
                basePrice: productDto.basePrice ?? 0,
            })

            if (!newProduct) {
                responseData.message = 'Can not create product'
                return {
                    status: HttpStatus.BAD_REQUEST,
                    content: responseData
                }
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

            responseData.appData = {
                product: {
                    ...newProduct,
                    toppings: toppings,
                }
            }
            responseData.hasError = false
            return {
                status: HttpStatus.CREATED,
                content: responseData,
            }
        } catch (e) {
            this.logger.error(e)
            return {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                content: null
            }
        }
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
        const responseData = new ResponseData()
        try {
            const product = await this.productRepository.findOne({
                where: { isDeleted: false, id: updateProductDto.id }
            })

            if (!product) {
                responseData.message = 'Product not exist'
                return {
                    status: HttpStatus.BAD_REQUEST,
                    content: responseData
                }
            }

            product.basePrice = updateProductDto.basePrice
            product.name = updateProductDto.name
            product.description = updateProductDto.description
            product.images = updateProductDto.images

            const updateProduct = await this.productRepository.save(product)
            if (!updateProduct) {
                return {
                    status: HttpStatus.BAD_REQUEST,
                    content: responseData
                }
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

            responseData.appData = {
                product: {
                    ...updateProduct,
                    toppings: [
                        ...updatedToppings,
                    ],
                }
            }
            responseData.hasError = false
            return {
                status: HttpStatus.CREATED,
                content: responseData,
            }

        } catch (e) {
            this.logger.error(e)
            return {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                content: null
            }
        }
    }

    /*
    @params:
        - menuId
        - productId
    */
    async addProductToMenu(dto: AddProductToMenuDto): Promise<ApiResponse> {
        const responseData = new ResponseData()
        try {
            const menuId = dto.menuId
            const productId = dto.productId

            const findMenu = await this.menuRepository.findOne({
                where: { isDeleted: false, id: menuId }
            })
            if (!findMenu) {
                responseData.message = 'Menu not found'
                return {
                    status: HttpStatus.BAD_REQUEST,
                    content: responseData
                }
            }

            const findProduct = await this.productRepository.findOne({
                where: { isDeleted: false, id: productId }
            })
            if (!findProduct) {
                responseData.message = 'Product not found'
                return {
                    status: HttpStatus.BAD_REQUEST,
                    content: responseData
                }
            }

            const addMenuProduct = await this.menuProductRepository.save({
                menuId: menuId,
                productId: productId,
            })

            if (!addMenuProduct) {
                responseData.message = 'Can not add this product to menu'
                return {
                    status: HttpStatus.BAD_REQUEST,
                    content: responseData
                }
            }

            responseData.message = "Success"
            responseData.hasError = false
            return {
                status: HttpStatus.OK,
                content: responseData,
            }
        } catch (e) {
            this.logger.error(e)
            return {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                content: null
            }
        }
    }

    /*
    @params:
        - id
    */
    async deleteProduct(product: DeleteProductDto): Promise<ApiResponse> {
        const responseData = new ResponseData()
        try {
            const checkProduct = await this.productRepository.findOne({
                where: { isDeleted: false, id: product.id }
            })
            if (!checkProduct) {
                responseData.message = 'Product not found'
                return {
                    status: HttpStatus.BAD_REQUEST,
                    content: responseData
                }
            }

            const deletedProduct = await this.productRepository.save({
                ...checkProduct,
                isDeleted: true,
                deletedDate: new Date()
            })
            if (!deletedProduct) {
                responseData.message = 'Can not delete this product'
                return {
                    status: HttpStatus.BAD_REQUEST,
                    content: responseData
                }
            }

            // Delete menu-product constraints
            const deletedMenuProduct = await this.menuProductRepository.createQueryBuilder()
                .update(MenuProduct)
                .set({ isDeleted: true, deletedDate: new Date() })
                .where("productId = :id", { id: deletedProduct.id })
                .execute()
            if (deletedMenuProduct.affected === 0) {
                return {
                    status: HttpStatus.BAD_REQUEST,
                    content: responseData,
                }
            }

            // Delete product-topping constraints
            const deletedProductTopping = await this.productToppingRepository.createQueryBuilder()
                .update(ProductTopping)
                .set({ isDeleted: true, deletedDate: new Date() })
                .where("productId = :id", { id: deletedProduct.id })
                .execute()
            if (deletedProductTopping.affected === 0) {
                return {
                    status: HttpStatus.BAD_REQUEST,
                    content: responseData,
                }
            }

            responseData.message = "Success"
            responseData.hasError = false
            return {
                status: HttpStatus.OK,
                content: responseData,
            }
        } catch (e) {
            this.logger.error(e)
            return {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                content: null
            }
        }
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
