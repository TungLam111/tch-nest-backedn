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
  latitude: number;

  @Column()
  longitude: number;

  @Column()
  ggPlaceId: string;

  @Column()
  timeSchedule: string;

  @Column({ nullable: true })
  images: string;

}


export function StoreCreateInput(createStoreDto: {
        name: string, contactPhone: string, address: string, latitude: number, longitude: number, ggPlaceId: string, timeSchedule: string, images: string | null
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
        name: string, contactPhone: string, address: string, latitude: number, longitude: number, ggPlaceId: string, timeSchedule: string, images: string | null
    }): Store {
  return {
    ...currentStore,
        name: updateStoreDto.name,
    contactPhone: updateStoreDto.contactPhone,
    address: updateStoreDto.address,
    latitude: updateStoreDto.latitude,
    longitude: updateStoreDto.longitude,
    ggPlaceId: updateStoreDto.ggPlaceId,
    timeSchedule: updateStoreDto.timeSchedule,
    images: updateStoreDto.images,
  };
}

