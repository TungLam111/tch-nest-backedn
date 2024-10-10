import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Location } from 'src/modules/location/entities/location.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LocationRepository extends Repository<Location> {
  constructor(
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
  ) {
    super(
      locationRepository.target,
      locationRepository.manager,
      locationRepository.queryRunner,
    );
  }

  async findAllByUserId(userId: string): Promise<Location[]> {
    return this.find({
      where: {
        isDeleted: false,
        userId: userId,
      },
      order: {
        updatedAt: 'ASC',
      },
    });
  }

  async findOneById(id: string): Promise<Location | null> {
    return this.findOneBy({ id: id, isDeleted: false });
  }

  async createOne(location: Location): Promise<Location> {
    return await this.save(location);
  }

  async updateOne(location: Location): Promise<Location> {
    return await this.save(location);
  }

  async destroy(location: Location): Promise<Location> {
    return await this.save({
      ...location,
      isDeleted: true,
      deletedDate: new Date(),
    });
  }
}
