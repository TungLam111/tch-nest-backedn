import { AbstractEntity } from 'src/helper/common/common_entity';
import { Column, Entity, PrimaryGeneratedColumn,
 ManyToOne, JoinColumn } from 'typeorm';
import { User } from 'src/modules/user/entities/user.entity';

@Entity()
export class Location extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  address: string;

  @Column({ nullable: true })
  name: string;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @Column()
  ggPlaceId: string;

  @Column()
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id'})
  user: User;

}


export function LocationCreateInput(createLocationDto: {
        address: string, name: string | null, latitude: number, longitude: number, ggPlaceId: string, userId: string
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

export function LocationUpdateInput(currentLocation: Location, updateLocationDto: {
        address: string, name: string | null, latitude: number, longitude: number, ggPlaceId: string, userId: string
    }): Location {
  return {
    ...currentLocation,
        address: updateLocationDto.address,
    name: updateLocationDto.name,
    latitude: updateLocationDto.latitude,
    longitude: updateLocationDto.longitude,
    ggPlaceId: updateLocationDto.ggPlaceId,
    userId: updateLocationDto.userId,
  };
}

