import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiResponse, ResponseData } from 'src/helper/common/interfaces';
import { Repository } from 'typeorm';
import { Store } from './entities/store.entity';
import { CreateStoreDto } from './interfaces/create-store.dto';
import { GetStoreListDto } from './interfaces/get-store-list.dto';
import { UpdateStoreDto } from './interfaces/update-store.dto';

@Injectable()
export class StoreService {
    constructor(
        @InjectRepository(Store) private readonly storeRepository: Repository<Store>,
    ) { }

    private logger = new Logger(StoreService.name);

    async getAllStore(filter: GetStoreListDto): Promise<ApiResponse> {
        const responseData = new ResponseData()
        try {
            let stores;
            if (!filter.latitude || !filter.longitude) {
                stores = await this.storeRepository.find({
                    where: { isDeleted: false }
                })
            } else {
                stores = await this.storeRepository
                    .createQueryBuilder('store')
                    .addSelect(`(
                                6371 * acos(
                                cos(radians(${filter.latitude})) * cos(radians(store.latitude)) *
                                cos(radians(store.longitude) - radians(${filter.longitude})) +
                                sin(radians(${filter.latitude})) * sin(radians(store.latitude))
                                )
                            )`, 'distance')
                    .where(`store."isDeleted" = false`)
                    .orderBy('distance', 'ASC')
                    .getMany();
            }

            responseData.hasError = false
            responseData.appData = stores
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

    async getOneStore(id: string): Promise<ApiResponse> {
        const responseData = new ResponseData()
        try {
            const store = await this.storeRepository.findOne({
                where: {
                    isDeleted: false,
                    id: id
                }
            })

            if (!store) {
                return {
                    status: HttpStatus.BAD_REQUEST,
                    content: responseData
                }
            }

            responseData.hasError = false
            responseData.appData = store
            return {
                status: HttpStatus.OK,
                content: responseData
            }
        } catch (e) {
            this.logger.error(e)
            return {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                content: null
            }
        }
    }

    async createStore(createDto: CreateStoreDto): Promise<ApiResponse> {
        const responseData = new ResponseData()
        try {
            let store = new Store()
            store.address = createDto.address;
            store.name = createDto.name;
            store.contactPhone = createDto.contactPhone;
            store.latitude = createDto.latitude;
            store.longitude = createDto.longitude;
            store.ggPlaceId = createDto.ggPlaceId;
            store.timeSchedule = createDto.timeSchedule;
            store.images = JSON.stringify(createDto.images)

            store = await this.storeRepository.save(store)

            if (!store) {
                return {
                    status: HttpStatus.BAD_REQUEST,
                    content: responseData
                }
            }

            responseData.hasError = true
            responseData.appData = store
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

    async updateStore(updateDto: UpdateStoreDto): Promise<ApiResponse> {
        const responseData = new ResponseData()
        try {
            let store = await this.storeRepository.findOne({
                where: {
                    isDeleted: false,
                    id: updateDto.id
                }
            })

            if (!store) {
                return {
                    status: HttpStatus.BAD_REQUEST,
                    content: responseData
                }
            }

            let toUpdate: Store = {
                ...store,
                ...updateDto,
                images: JSON.stringify(updateDto.images)
            }

            toUpdate = await this.storeRepository.save(toUpdate)
            responseData.hasError = false
            responseData.appData = toUpdate
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

    async deleteStore(id: string): Promise<ApiResponse> {
        const responseData = new ResponseData()
        try {
            let store = await this.storeRepository.findOne({
                where: { isDeleted: false, id: id }
            })

            if (!store) {
                return {
                    status: HttpStatus.BAD_REQUEST,
                    content: responseData,
                }
            }

            store.isDeleted = true
            store.deletedDate = new Date()

            store = await this.storeRepository.save(store)

            responseData.hasError = false
            responseData.appData = store
            return {
                status: HttpStatus.OK,
                content: responseData
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
