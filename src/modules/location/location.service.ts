import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiResponse, ResponseData } from 'src/helper/common/interfaces';
import { Repository } from 'typeorm';
import { Location } from '../location/entities/location.entity';
import { User } from '../user/entities/user.entity';
import { CreateLocationDto } from './dtos/create-location.dto';
import { UpdateLocationDto } from './dtos/update-location.dto';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
  ) {}
  private logger = new Logger(LocationService.name);

  async getLocationsByUser(user: User): Promise<ApiResponse<any>> {
    const response = new ResponseData();
    try {
      const locations = await this.locationRepository.find({
        where: {
          userId: user.id,
          isDeleted: false,
        },
      });
      response.hasError = false;
      response.appData = locations;
      return {
        status: HttpStatus.OK,
        content: response,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        content: null,
      };
    }
  }

  async updateLocation(
    user: User,
    locationId: string,
    newLocation: UpdateLocationDto,
  ): Promise<ApiResponse<any>> {
    const response = new ResponseData();
    try {
      let location = await this.locationRepository.findOne({
        where: {
          userId: user.id,
          isDeleted: false,
          id: locationId,
        },
      });

      if (!location) {
        return {
          status: HttpStatus.BAD_REQUEST,
          content: response,
        };
      }

      location = {
        ...location,
        address: newLocation.address,
        name: newLocation.name,
        latitude: newLocation.latitude,
        longtitude: newLocation.longitude,
        ggPlaceId: newLocation.ggPlaceId,
      };

      location = await this.locationRepository.save(location);
      if (!location) {
        throw new Error('Save fail update location');
      }

      response.hasError = false;
      response.appData = location;
      return {
        status: HttpStatus.OK,
        content: response,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        content: null,
      };
    }
  }

  async addLocation(
    user: User,
    newLocation: CreateLocationDto,
  ): Promise<ApiResponse<any>> {
    const response = new ResponseData();
    try {
      let location = new Location();
      location.address = newLocation.address;
      location.name = newLocation.name;
      location.latitude = newLocation.latitude;
      location.longtitude = newLocation.longitude;
      location.ggPlaceId = newLocation.ggPlaceId;
      location.userId = user.id;

      location = await this.locationRepository.save(location);
      if (!location) {
        throw new Error('Save fail create location');
      }

      response.hasError = false;
      response.appData = location;
      return {
        status: HttpStatus.CREATED,
        content: response,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        content: null,
      };
    }
  }

  async getLocation(user: User, id: string): Promise<ApiResponse<any>> {
    const response = new ResponseData();
    try {
      const location = await this.locationRepository.findOne({
        where: {
          id: id,
          isDeleted: false,
        },
      });
      if (!location) {
        throw new Error('Fail to get location');
      }

      response.hasError = false;
      response.appData = location;
      return {
        status: HttpStatus.OK,
        content: response,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        content: null,
      };
    }
  }

  async deleteLocation(user: User, id: string): Promise<ApiResponse<any>> {
    const response = new ResponseData();
    try {
      let location = await this.locationRepository.findOne({
        where: {
          id: id,
          isDeleted: false,
        },
      });

      location = {
        ...location,
        isDeleted: true,
        deletedDate: new Date(),
      };

      location = await this.locationRepository.save(location);
      if (!location) {
        throw new Error('Fail to delete location');
      }

      response.hasError = false;
      response.appData = location;
      return {
        status: HttpStatus.OK,
        content: response,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        content: null,
      };
    }
  }
}
