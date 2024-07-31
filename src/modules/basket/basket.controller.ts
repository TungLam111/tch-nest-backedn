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
import { AuthenticatedRequest } from 'src/helper/common/interfaces';
import { BasketService } from './basket.service';
import { AddBasketDTO, UpdateBasketDTO } from './dtos/request.dto';

@Controller('basket')
export class BasketController {
  constructor(private basketService: BasketService) {}

  @Get()
  async getAll(@Res() res: any, @Req() req: AuthenticatedRequest) {
    const result = await this.basketService.getAllBasketItems(req.user.id);
    res.status(result.status).json(result.content);
  }

  @Get(':id')
  async getOne(
    @Res() res: any,
    @Req() req: AuthenticatedRequest,
    @Param('id') basketId: string,
  ) {
    const result = await this.basketService.getOneBasketItem(
      req.user.id,
      basketId,
    );
    res.status(result.status).json(result.content);
  }

  @Post()
  async addOne(
    @Res() res: any,
    @Req() req: AuthenticatedRequest,
    @Body() requestDto: AddBasketDTO,
  ) {
    const result = await this.basketService.addOne(req.user.id, requestDto);
    res.status(result.status).json(result.content);
  }

  @Put(':id')
  async updateOne(
    @Res() res: any,
    @Req() req: AuthenticatedRequest,
    @Param('id') basketId: string,
    @Body() requestDto: UpdateBasketDTO,
  ) {
    const result = await this.basketService.updateOne(
      req.user.id,
      basketId,
      requestDto,
    );
    res.status(result.status).json(result.content);
  }

  @Delete(':id')
  async deleteOne(
    @Res() res: any,
    @Req() req: AuthenticatedRequest,
    @Param('id') basketId: string,
  ) {
    const result = await this.basketService.deleteOne(req.user.id, basketId);
    res.status(result.status).json(result.content);
  }
}
