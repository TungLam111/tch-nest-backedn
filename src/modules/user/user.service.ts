import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ApiResponse, ResponseData } from '../../helper/common/interfaces';
import { ProductService } from '../product/product.service';

@Injectable()
export class UserService {
    constructor(
        private productService: ProductService,
    ) { }

    private logger = new Logger(UserService.name);

    async getRecentProducts(): Promise<ApiResponse> {
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

    async getUserInfo(): Promise<ApiResponse> {
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

    async likeProduct(productId: string): Promise<ApiResponse> {
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

    async getLikedProducts(): Promise<ApiResponse> {
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
}
