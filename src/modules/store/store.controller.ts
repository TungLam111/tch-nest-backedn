import { Body, Controller, Delete, Get, Param, Post, Put, Query, Res } from '@nestjs/common';
import { CreateStoreDto } from './interfaces/create-store.dto';
import { GetStoreListDto } from './interfaces/get-store-list.dto';
import { UpdateStoreDto } from './interfaces/update-store.dto';
import { StoreService } from './store.service';

@Controller('store')
export class StoreController {
    constructor(private storeService: StoreService) { }

    @Get()
    async getAllStore(@Res() res: any, @Query() filter: GetStoreListDto) {
        const result = await this.storeService.getAllStore(filter);
        res.status(result.status).json(result.content);
    }

    @Get(':id')
    async getStore(@Res() res: any, @Param('id') id: string) {
        const result = await this.storeService.getOneStore(id);
        res.status(result.status).json(result.content);
    }

    @Post()
    async addStore(@Res() res: any, @Body() store: CreateStoreDto) {
        const result = await this.storeService.createStore(store)
        res.status(result.status).json(result.content);
    }

    @Put()
    async updateStore(@Res() res: any, @Body() store: UpdateStoreDto) {
        const result = await this.storeService.updateStore(store)
        res.status(result.status).json(result.content);
    }

    @Delete(':id')
    async deleteStore(@Res() res: any, @Param('id') id: string) {
        const result = await this.storeService.deleteStore(id)
        res.status(result.status).json(result.content);
    }
}
