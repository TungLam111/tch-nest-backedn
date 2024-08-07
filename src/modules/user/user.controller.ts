import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { AuthenticatedRoleRequest } from 'src/core/middleware/auth-user';
import { FavoriteProductAction } from 'src/helper/common/enum';
import { LikeProductDto } from './dtos/like-product.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  // Get recent ordered products
  @Get('recent-products')
  async getRecentProducts(
    @Res() res: any,
    @Req() req: AuthenticatedRoleRequest,
  ) {
    const result = await this.userService.getRecentProducts(req.user.user.id);
    res.status(result.status).json(result.content);
  }

  // Add to favorite products
  @Get('favorite-product')
  async getFavoriteProducts(
    @Res() res: any,
    @Req() req: AuthenticatedRoleRequest,
  ) {
    const result = await this.userService.getLikedProducts(req.user.user);
    res.status(result.status).json(result.content);
  }

  // Get user info
  @Get(':id')
  async getUserInfo(@Res() res: any, @Req() req: AuthenticatedRoleRequest) {
    res.status(HttpStatus.OK).json(req.user);
  }

  // Add to favorite products
  @Post('favorite-product')
  async likeProduct(
    @Res() res: any,
    @Req() req: AuthenticatedRoleRequest,
    @Body() likeProductDto: LikeProductDto,
  ) {
    let result;
    if (likeProductDto.type === FavoriteProductAction.like) {
      result = await this.userService.likeProduct(
        req.user.user,
        likeProductDto.productId,
      );
    } else {
      result = await this.userService.unlikeProduct(
        req.user.user,
        likeProductDto.productId,
      );
    }
    res.status(result.status).json(result.content);
  }
}
