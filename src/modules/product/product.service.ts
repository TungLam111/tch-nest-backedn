import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiResponse, ResponseData } from '../../helper/common/interfaces';
import { MenuProduct } from '../menu/entities/menu-product.entity';
import { Menu } from '../menu/entities/menu.entity';
import { MenuService } from '../menu/menu.service';
import { AddProductToMenuDto } from './dtos/add-product-menu.dto';
import { CreateProductDto } from './dtos/create-product.dto';
import { ProductTopping } from './entities/product-topping.entity';
import { Product } from './entities/product.entity';
import { ToppingOption } from './entities/topping-option.entity';
import { Topping } from './entities/topping.entity';

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
            const queryBuilder = this.menuProductRepository
                .createQueryBuilder('menu_product')
                .leftJoinAndSelect('menu_product.product', 'product')
                .leftJoinAndSelect('menu_product.menu', 'menu')

            const productsWithMenu = await queryBuilder.getRawMany()
            responseData.appData = productsWithMenu
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

    async searchProduct(productName: string): Promise<ApiResponse> {
        const responseData = new ResponseData();
        try {
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

    async getProductDetail(id: string): Promise<ApiResponse> {
        const responseData = new ResponseData();
        try {
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

            responseData.appData = newProduct
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


}
