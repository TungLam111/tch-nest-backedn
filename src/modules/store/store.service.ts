import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FunctionError } from 'src/helper/common/error_app';
import { ApiResponse } from 'src/helper/common/interfaces';
import { SharedService } from 'src/helper/shared_service';
import { Repository } from 'typeorm';
import { Store } from './entities/store.entity';
import { CreateStoreDto } from './interfaces/create-store.dto';
import { GetStoreListDto } from './interfaces/get-store-list.dto';
import { UpdateStoreDto } from './interfaces/update-store.dto';

@Injectable()
export class StoreService extends SharedService {
  constructor(
    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>,
  ) {
    super(StoreService.name);
  }

  async getAllStore(filter: GetStoreListDto): Promise<ApiResponse<Store[]>> {
    return this.handleRequest(async () => {
      let stores;
      if (!filter.latitude || !filter.longitude) {
        stores = await this.storeRepository.find({
          where: { isDeleted: false },
        });
      } else {
        stores = await this.storeRepository
          .createQueryBuilder('store')
          .addSelect(
            `(
                                6371 * acos(
                                cos(radians(${filter.latitude})) * cos(radians(store.latitude)) *
                                cos(radians(store.longitude) - radians(${filter.longitude})) +
                                sin(radians(${filter.latitude})) * sin(radians(store.latitude))
                                )
                            )`,
            'distance',
          )
          .where(`store."isDeleted" = false`)
          .orderBy('distance', 'ASC')
          .getMany();
      }
      return stores;
    });
  }

  async getOneStore(id: string): Promise<ApiResponse<Store>> {
    return this.handleRequest<Store>(async () => {
      const store = await this.storeRepository.findOne({
        where: {
          isDeleted: false,
          id: id,
        },
      });

      if (!store) {
        throw new FunctionError(HttpStatus.BAD_REQUEST, 'Can not find');
      }
      return store;
    });
  }

  async createStore(createDto: CreateStoreDto): Promise<ApiResponse<Store>> {
    return this.handleRequest<Store>(async () => {
      let store = new Store();
      store.address = createDto.address;
      store.name = createDto.name;
      store.contactPhone = createDto.contactPhone;
      store.latitude = createDto.latitude;
      store.longitude = createDto.longitude;
      store.ggPlaceId = createDto.ggPlaceId;
      store.timeSchedule = createDto.timeSchedule;
      store.images = JSON.stringify(createDto.images);

      store = await this.storeRepository.save(store);

      if (!store) {
        throw new FunctionError(
          HttpStatus.INTERNAL_SERVER_ERROR,
          'Fail to create store',
        );
      }
      return store;
    }, HttpStatus.CREATED);
  }

  async updateStore(updateDto: UpdateStoreDto): Promise<ApiResponse<Store>> {
    return this.handleRequest<Store>(async () => {
      let store = await this.storeRepository.findOne({
        where: {
          isDeleted: false,
          id: updateDto.id,
        },
      });

      if (!store) {
        throw new FunctionError(HttpStatus.BAD_REQUEST, 'Store not found');
      }

      let toUpdate: Store = {
        ...store,
        ...updateDto,
        images: JSON.stringify(updateDto.images),
      };

      toUpdate = await this.storeRepository.save(toUpdate);
      return toUpdate;
    });
  }

  async deleteStore(id: string): Promise<ApiResponse<Store>> {
    return this.handleRequest<Store>(async () => {
      let store = await this.storeRepository.findOne({
        where: { isDeleted: false, id: id },
      });

      if (!store) {
        throw new FunctionError(HttpStatus.BAD_REQUEST, 'Store not found');
      }

      store.isDeleted = true;
      store.deletedDate = new Date();

      store = await this.storeRepository.save(store);
      return store;
    });
  }
}
