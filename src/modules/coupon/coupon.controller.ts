import { Body, Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { AuthenticatedRoleRequest } from 'src/core/middleware/auth-user';
import { CouponService } from './coupon.service';
import { AddCouponRequest } from './dtos/request.dto';

@Controller('coupon')
export class CouponController {
  constructor(private couponService: CouponService) {}
  @Get()
  async getAll(@Res() res: any, @Req() req: AuthenticatedRoleRequest) {
    const result = await this.couponService.getAll(req.user.user.id);
    res.status(result.status).json(result.content);
  }

  @Get(':id')
  async getOne(
    @Res() res: any,
    @Req() req: AuthenticatedRoleRequest,
    @Param('id') couponId: string,
  ) {
    const result = await this.couponService.getOne(req.user.user.id, couponId);
    res.status(result.status).json(result.content);
  }

  @Post()
  async addOne(@Res() res: any, @Body() requestBody: AddCouponRequest) {
    const result = await this.couponService.addOne(requestBody);
    res.status(result.status).json(result.content);
  }
}
