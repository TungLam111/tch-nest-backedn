import { AbstractEntity } from 'src/helper/common/common-entity';
import { User } from 'src/modules/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Location extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  address: string;

  @Column({ nullable: true })
  name: string;

  @Column()
  latitude: string;

  @Column()
  longitude: string;

  @Column()
  ggPlaceId: string;

  @Column()
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: User;
}

export function LocationCreateInput(createLocationDto: {
  address: string;
  name: string | null;
  latitude: string;
  longitude: string;
  ggPlaceId: string;
  userId: string;
}): Location {
  const createDto: Location = new Location();
  createDto.address = createLocationDto.address;
  createDto.name = createLocationDto.name;
  createDto.latitude = createLocationDto.latitude;
  createDto.longitude = createLocationDto.longitude;
  createDto.ggPlaceId = createLocationDto.ggPlaceId;
  createDto.userId = createLocationDto.userId;
  return createDto;
}

export function LocationUpdateInput(
  currentLocation: Location,
  updateLocationDto: {
    address?: string;
    name?: string | null;
    latitude?: string;
    longitude?: string;
    ggPlaceId?: string;
    userId?: string;
  },
): Location {
  const updateLocation: Location = {
    ...currentLocation,
  };

  if (updateLocationDto.address != undefined) {
    updateLocation.address = updateLocationDto.address;
  }
  if (updateLocationDto.name != undefined) {
    updateLocation.name = updateLocationDto.name;
  }
  if (updateLocationDto.latitude != undefined) {
    updateLocation.latitude = updateLocationDto.latitude;
  }
  if (updateLocationDto.longitude != undefined) {
    updateLocation.longitude = updateLocationDto.longitude;
  }
  if (updateLocationDto.ggPlaceId != undefined) {
    updateLocation.ggPlaceId = updateLocationDto.ggPlaceId;
  }
  if (updateLocationDto.userId != undefined) {
    updateLocation.userId = updateLocationDto.userId;
  }

  return updateLocation;
}
