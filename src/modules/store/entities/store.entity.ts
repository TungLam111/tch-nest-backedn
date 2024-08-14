import { AbstractEntity } from 'src/helper/common/common_entity';
import { Column, Entity, PrimaryGeneratedColumn,
  } from 'typeorm';

@Entity()
export class Store extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  contactPhone: string;

  @Column()
  address: string;

  @Column()
  latitude: string;

  @Column()
  longitude: string;

  @Column()
  ggPlaceId: string;

  @Column()
  timeSchedule: string;

  @Column({ nullable: true })
  images: string;

}


export function StoreCreateInput(createStoreDto: {
        name: string, contactPhone: string, address: string, latitude: string, longitude: string, ggPlaceId: string, timeSchedule: string, images: string | null
    }): Store {
  const createDto: Store = new Store();
    createDto.name = createStoreDto.name;
  createDto.contactPhone = createStoreDto.contactPhone;
  createDto.address = createStoreDto.address;
  createDto.latitude = createStoreDto.latitude;
  createDto.longitude = createStoreDto.longitude;
  createDto.ggPlaceId = createStoreDto.ggPlaceId;
  createDto.timeSchedule = createStoreDto.timeSchedule;
  createDto.images = createStoreDto.images;
  return createDto;
}

export function StoreUpdateInput(currentStore: Store, updateStoreDto: {
        name?: string, contactPhone?: string, address?: string, latitude?: string, longitude?: string, ggPlaceId?: string, timeSchedule?: string, images?: string | null
    }): Store {
  const updateStore : Store = {
    ...currentStore,
  }

      if (updateStoreDto.name != undefined) { updateStore.name = updateStoreDto.name;}
    if (updateStoreDto.contactPhone != undefined) { updateStore.contactPhone = updateStoreDto.contactPhone;}
    if (updateStoreDto.address != undefined) { updateStore.address = updateStoreDto.address;}
    if (updateStoreDto.latitude != undefined) { updateStore.latitude = updateStoreDto.latitude;}
    if (updateStoreDto.longitude != undefined) { updateStore.longitude = updateStoreDto.longitude;}
    if (updateStoreDto.ggPlaceId != undefined) { updateStore.ggPlaceId = updateStoreDto.ggPlaceId;}
    if (updateStoreDto.timeSchedule != undefined) { updateStore.timeSchedule = updateStoreDto.timeSchedule;}
    if (updateStoreDto.images != undefined) { updateStore.images = updateStoreDto.images;}
  
  return updateStore;
}

