import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/core/base/base-service';
import { FunctionError } from 'src/helper/common/error-app';
import { Repository } from 'typeorm';
import { ApiResponse } from '../../helper/common/interfaces';
import { CreateMenuDto, UpdateMenuDto } from './dtos/request';
import {
  DeleteMenuResponse,
  entityToResponse,
  MenuResponse,
} from './dtos/response';
import { Menu, MenuCreateInput, MenuUpdateInput } from './entities/menu.entity';

@Injectable()
export class MenuService extends BaseService<Menu, Repository<Menu>> {
  constructor(
    @InjectRepository(Menu) private readonly menuRepository: Repository<Menu>,
  ) {
    super(menuRepository, MenuService.name);
  }

  async createMenu(
    createMenuDto: CreateMenuDto,
  ): Promise<ApiResponse<MenuResponse>> {
    return this.handleRequest(async () => {
      const menuDto = MenuCreateInput({
        name: createMenuDto.name,
        description: createMenuDto.description,
        image: createMenuDto.image,
        menuProducts: null,
      });

      const createdMenu = await this.menuRepository.save(menuDto);
      return entityToResponse(createdMenu);
    });
  }

  async updateMenu(menuDto: UpdateMenuDto): Promise<ApiResponse<MenuResponse>> {
    return this.handleRequest<MenuResponse>(async () => {
      const findMenu = await this.menuRepository.findOne({
        where: { id: menuDto.id, isDeleted: false },
      });

      if (!findMenu) {
        throw new FunctionError(HttpStatus.BAD_REQUEST, 'Menu not found');
      }

      const dto = MenuUpdateInput(findMenu, {
        name: menuDto.name,
        description: menuDto.description,
        image: menuDto.image,
      });

      const updatedMenu = await this.menuRepository.save(dto);
      return entityToResponse(updatedMenu);
    });
  }

  async getMenus(): Promise<ApiResponse<MenuResponse[]>> {
    return this.handleRequest(async () => {
      const menus = await this.menuRepository.find({
        where: { isDeleted: false },
      });
      if (!menus) {
        throw new FunctionError(HttpStatus.OK, 'Can not find menus');
      }
      return menus.map((e) => ({
        id: e.id,
        name: e.name,
        image: e.image,
        description: e.description,
      }));
    });
  }

  async getOneMenu(menuId: string): Promise<ApiResponse<MenuResponse>> {
    return this.handleRequest(async () => {
      const menu = await this.menuRepository.findOne({
        where: { id: menuId, isDeleted: false },
      });

      if (!menu) {
        throw new FunctionError(HttpStatus.BAD_REQUEST, 'Can not find menu');
      }

      return {
        id: menu.id,
        name: menu.name,
        image: menu.image,
        description: menu.description,
      };
    });
  }

  async delete(id: string): Promise<ApiResponse<DeleteMenuResponse>> {
    return this.handleRequest<DeleteMenuResponse>(async () => {
      const menu = await this.menuRepository.findOne({
        where: { id, isDeleted: false },
      });

      if (!menu) {
        throw new FunctionError(HttpStatus.BAD_REQUEST, 'Menu not exist');
      }
      menu.isDeleted = true;
      menu.deletedDate = new Date();

      const deletedMenu = await this.menuRepository.save(menu);

      return {
        id: deletedMenu.id,
        name: deletedMenu.name,
        image: deletedMenu.image,
        description: deletedMenu.description,
        isDeleted: deletedMenu.isDeleted,
        deletedDate: deletedMenu.deletedDate,
      };
    });
  }
}
