import { Body, Controller, Get, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { FavoriteProductAction } from 'src/helper/common/enum';
import { AuthenticatedRequest } from 'src/helper/common/interfaces';
import { LikeProductDto } from './dtos/like-product.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    // Get recent ordered products
    @Get('recent-products')
    async getRecentProducts(@Res() res: any, @Req() req: AuthenticatedRequest) {
        const result = await this.userService.getRecentProducts(req.user.id)
        res.status(result.status).json(result.content)
    }

    // Add to favorite products
    @Get('favorite-product')
    async getFavoriteProducts(@Res() res: any, @Req() req: AuthenticatedRequest) {
        const result = await this.userService.getLikedProducts(req.user)
        res.status(result.status).json(result.content)
    }

    // Get user info
    @Get(':id')
    async getUserInfo(@Res() res: any, @Req() req: AuthenticatedRequest) {
        res.status(HttpStatus.OK).json(req.user)
    }

    // Add to favorite products
    @Post('favorite-product')
    async likeProduct(@Res() res: any, @Req() req: AuthenticatedRequest, @Body() likeProductDto: LikeProductDto) {
        let result;
        if (likeProductDto.type === FavoriteProductAction.like) {
            result = await this.userService.likeProduct(req.user, likeProductDto.productId)
        } else {
            result = await this.userService.unlikeProduct(req.user, likeProductDto.productId)
        }
        res.status(result.status).json(result.content)
    }

}
