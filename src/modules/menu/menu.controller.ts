import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { CreateMenuDto, UpdateMenuDto } from './dtos/request';
import { MenuService } from './menu.service';

@Controller('menu')
export class MenuController {
  constructor(private menuService: MenuService) {}

  @Get()
  async getAllMenus(@Res() res: any) {
    const result = await this.menuService.getMenus();
    res.status(result.status).json(result.content);
  }

  @Get('/:id')
  async getOneMenu(@Res() res: any, @Param('id') menuId: string) {
    const result = await this.menuService.getOneMenu(menuId);
    res.status(result.status).json(result.content);
  }

  @Post()
  async createMenu(@Res() res: any, @Body() createMenuDto: CreateMenuDto) {
    const result = await this.menuService.createMenu(createMenuDto);
    res.status(result.status).json(result.content);
  }

  @Patch()
  async updateMenu(@Res() res: any, @Body() menuDto: UpdateMenuDto) {
    const result = await this.menuService.updateMenu(menuDto);
    res.status(result.status).json(result.content);
  }

  @Delete('/:id')
  async deleteMenu(@Res() res: any, @Param('id') menuId: string) {
    const result = await this.menuService.delete(menuId);
    res.status(result.status).json(result.content);
  }
}
