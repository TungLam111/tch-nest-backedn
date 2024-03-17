import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiResponse, ResponseData } from '../../helper/common/interfaces';
import { Product } from '../product/entities/product.entity';
import { ProductService } from '../product/product.service';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(Product) private readonly productRepository: Repository<Product>,

        private productService: ProductService,
    ) { }

    private logger = new Logger(UserService.name);

    async getRecentProducts(userId: string): Promise<ApiResponse> {
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

    async likeProduct(user: User, productId: string): Promise<ApiResponse> {
        const responseData = new ResponseData();
        try {
            const productCheck = await this.productService.findOne(productId)
            if (!productCheck) {
                return {
                    status: HttpStatus.BAD_REQUEST,
                    content: responseData,
                }
            }

            let likeProducts: string[];
            if (!user.likeProducts) {
                likeProducts = []
            } else {
                likeProducts = JSON.parse(user.likeProducts)
            }
            likeProducts.push(productCheck.id)

            let updateUser: User = {
                ...user,
                likeProducts: JSON.stringify(likeProducts)
            }

            updateUser = await this.userRepository.save(updateUser)
            if (!updateUser) {
                return {
                    status: HttpStatus.BAD_REQUEST,
                    content: responseData
                }
            }

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


    async unlikeProduct(user: User, productId: string): Promise<ApiResponse> {
        const responseData = new ResponseData();
        try {
            const productCheck = await this.productService.findOne(productId)
            if (!productCheck) {
                return {
                    status: HttpStatus.BAD_REQUEST,
                    content: responseData,
                }
            }

            let likeProducts: string[];
            if (!user.likeProducts) {
                return {
                    status: HttpStatus.BAD_REQUEST,
                    content: responseData,
                }
            } else {
                likeProducts = JSON.parse(user.likeProducts)
            }
            likeProducts = likeProducts.filter((p) => p != productCheck.id)

            let updateUser: User = {
                ...user,
                likeProducts: JSON.stringify(likeProducts)
            }

            updateUser = await this.userRepository.save(updateUser)
            if (!updateUser) {
                return {
                    status: HttpStatus.BAD_REQUEST,
                    content: responseData
                }
            }

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

    async getLikedProducts(user: User): Promise<ApiResponse> {
        const responseData = new ResponseData();
        try {
            let productIds = user.likeProducts;
            if (!productIds || productIds.length === 0) {
                responseData.hasError = false
                responseData.appData = []
                return {
                    status: HttpStatus.OK,
                    content: responseData,
                }
            }

            const products = await this.productRepository
                .createQueryBuilder('product')
                .where('product.id IN (:...ids)', {
                    ids: productIds || [],
                })
                .andWhere('product.isDeleted = false')
                .getMany()

            responseData.hasError = false
            responseData.appData = products
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
