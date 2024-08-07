import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { AuthenticatedRoleRequest } from 'src/core/middleware/auth-user';
import { BasketService } from './basket.service';
import { AddBasketDTO, UpdateBasketDTO } from './dtos/request.dto';

@Controller('basket')
export class BasketController {
  constructor(private basketService: BasketService) {}

  @Get()
  async getAll(@Res() res: any, @Req() req: AuthenticatedRoleRequest) {
    const result = await this.basketService.getAllBasketItems(req.user.user.id);
    res.status(result.status).json(result.content);
  }

  @Get(':id')
  async getOne(
    @Res() res: any,
    @Req() req: AuthenticatedRoleRequest,
    @Param('id') basketId: string,
  ) {
    const result = await this.basketService.getOneBasketItem(
      req.user.user.id,
      basketId,
    );

    console.log(JSON.stringify(result.content));
    res.status(result.status).json(result.content);
  }

  @Post()
  async addOne(
    @Res() res: any,
    @Req() req: AuthenticatedRoleRequest,
    @Body() requestDto: AddBasketDTO,
  ) {
    const result = await this.basketService.addOne(
      req.user.user.id,
      requestDto,
    );
    res.status(result.status).json(result.content);
  }

  @Put(':id')
  async updateOne(
    @Res() res: any,
    @Req() req: AuthenticatedRoleRequest,
    @Param('id') basketId: string,
    @Body() requestDto: UpdateBasketDTO,
  ) {
    const result = await this.basketService.updateOne(
      req.user.user.id,
      basketId,
      requestDto,
    );
    res.status(result.status).json(result.content);
  }

  @Delete(':id')
  async deleteOne(
    @Res() res: any,
    @Req() req: AuthenticatedRoleRequest,
    @Param('id') basketId: string,
  ) {
    const result = await this.basketService.deleteOne(
      req.user.user.id,
      basketId,
    );
    res.status(result.status).json(result.content);
  }
}
