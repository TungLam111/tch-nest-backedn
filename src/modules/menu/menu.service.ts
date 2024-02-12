import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiResponse, ResponseData } from '../../helper/common/interfaces';
import { CreateMenuDto } from './dtos/create-menu.dto';
import { UpdateMenuDto } from './dtos/update-menu.dto';
import { Menu } from './entities/menu.entity';

@Injectable()
export class MenuService {
    constructor(
        @InjectRepository(Menu) private readonly menuRepository: Repository<Menu>,
    ) { }

    private logger = new Logger(MenuService.name);

    async createMenu(createMenuDto: CreateMenuDto): Promise<ApiResponse> {
        const responseData = new ResponseData();
        try {
            const menu = await this.menuRepository.save({
                name: createMenuDto.name,
                description: createMenuDto.description,
                image: createMenuDto.image,
            })
            responseData.appData = menu
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

    async updateMenu(menuDto: UpdateMenuDto): Promise<ApiResponse> {
        const responseData = new ResponseData();
        try {
            const findMenu = await this.menuRepository.findOne({ where: { id: menuDto.id, isDeleted: false } })

            if (!findMenu) {
                responseData.message = 'Menu not found'
                return {
                    status: HttpStatus.BAD_REQUEST,
                    content: responseData,
                }
            }

            const menu = await this.menuRepository.save(menuDto)
            responseData.appData = menu
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

    async getMenus(): Promise<ApiResponse> {
        const responseData = new ResponseData();
        try {
            const menus = await this.menuRepository.find({
                where: { isDeleted: false }
            })
            if (!menus) {
                responseData.message = 'Can not find menus'
                return {
                    status: HttpStatus.OK,
                    content: responseData
                }
            }
            responseData.hasError = false
            responseData.appData = menus
            return {
                status: HttpStatus.OK,
                content: responseData,
            }
        } catch (e) {
            this.logger.error(e)
            return {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                content: e
            }
        }
    }

    async getOneMenu(menuId: string): Promise<ApiResponse> {
        const responseData = new ResponseData();
        try {
            const menu = await this.menuRepository.findOne({
                where: { id: menuId, isDeleted: false }
            })
            if (!menu) {
                responseData.message = 'Can not find menu'
                return {
                    status: HttpStatus.OK,
                    content: responseData,
                }
            }
            responseData.appData = menu;
            responseData.hasError = false;
            return {
                status: HttpStatus.OK,
                content: responseData,
            }
        } catch (e) {
            this.logger.error(e)
            return {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                content: e
            }
        }
    }

    async delete(id: string): Promise<ApiResponse> {
        const responseData = new ResponseData();
        try {
            const menu = await this.menuRepository.findOne({ where: { id, isDeleted: false } })

            if (!menu) {
                responseData.message = 'Menu not exist'
                return {
                    status: HttpStatus.BAD_REQUEST,
                    content: responseData
                }
            }
            menu.isDeleted = true
            menu.deletedDate = new Date()

            const deletedMenu = await this.menuRepository.save(menu)
            if (!deletedMenu) {
                responseData.message = 'Can not delete menu'
                return {
                    status: HttpStatus.BAD_REQUEST,
                    content: responseData,
                }
            }

            responseData.appData = deletedMenu;
            responseData.hasError = false;
            return {
                status: HttpStatus.OK,
                content: responseData,
            }
        } catch (e) {
            this.logger.error(e)
            return {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                content: e
            }
        }
    }
}
