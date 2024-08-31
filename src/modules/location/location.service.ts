import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/core/base/base-service';
import { ApiResponse, ResponseData } from 'src/helper/common/interfaces';
import { Repository } from 'typeorm';
import {
  Location,
  LocationCreateInput,
} from '../location/entities/location.entity';
import { User } from '../user/entities/user.entity';
import { CreateLocationDto, UpdateLocationDto } from './dtos/request';
import { DeleteLocationResponse, LocationResponse } from './dtos/response';

@Injectable()
export class LocationService extends BaseService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
  ) {
    super(LocationService.name);
  }

  async getLocationsByUser(
    user: User,
  ): Promise<ApiResponse<LocationResponse[]>> {
    const response = new ResponseData<LocationResponse[]>();
    try {
      const locations = await this.locationRepository.find({
        where: {
          userId: user.id,
          isDeleted: false,
        },
      });
      response.hasError = false;
      response.appData = locations.map(
        (e) =>
          <LocationResponse>{
            id: e.id,
            address: e.address,
            name: e.name,
            latitude: +e.latitude,
            longitude: +e.longitude,
            ggPlaceId: e.ggPlaceId,
            userId: e.userId,
          },
      );
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
  ): Promise<ApiResponse<LocationResponse>> {
    const response = new ResponseData<LocationResponse>();
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
        latitude: String(newLocation.latitude),
        longitude: String(newLocation.longitude),
        ggPlaceId: newLocation.ggPlaceId,
      };

      const updatedLocation = await this.locationRepository.save(location);
      if (!location) {
        throw new Error('Save fail update location');
      }

      response.hasError = false;
      response.appData = {
        id: updatedLocation.id,
        address: updatedLocation.address,
        name: updatedLocation.name,
        latitude: +updatedLocation.latitude,
        longitude: +updatedLocation.longitude,
        ggPlaceId: updatedLocation.ggPlaceId,
        userId: updatedLocation.userId,
      };
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
  ): Promise<ApiResponse<LocationResponse>> {
    const response = new ResponseData<LocationResponse>();
    try {
      let location = LocationCreateInput({
        address: newLocation.address,
        ggPlaceId: newLocation.ggPlaceId,
        latitude: newLocation.latitude.toString(),
        longitude: newLocation.longitude.toString(),
        userId: user.id,
        name: newLocation.name,
      });

      const createdLocation = await this.locationRepository.save(location);
      if (!location) {
        throw new Error('Save fail create location');
      }

      response.hasError = false;
      response.appData = {
        id: createdLocation.id,
        address: createdLocation.address,
        name: createdLocation.name,
        latitude: +createdLocation.latitude,
        longitude: +createdLocation.longitude,
        ggPlaceId: createdLocation.ggPlaceId,
        userId: createdLocation.userId,
      };
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

  async getLocation(
    user: User,
    id: string,
  ): Promise<ApiResponse<LocationResponse>> {
    const response = new ResponseData<LocationResponse>();
    try {
      const location = await this.locationRepository.findOne({
        where: {
          id: id,
          isDeleted: false,
          userId: user.id,
        },
      });
      if (!location) {
        throw new Error('Fail to get location');
      }

      response.hasError = false;
      response.appData = {
        id: location.id,
        address: location.address,
        name: location.name,
        latitude: +location.latitude,
        longitude: +location.longitude,
        ggPlaceId: location.ggPlaceId,
        userId: location.userId,
      };
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

  async deleteLocation(
    user: User,
    id: string,
  ): Promise<ApiResponse<DeleteLocationResponse>> {
    const response = new ResponseData<DeleteLocationResponse>();
    try {
      let location = await this.locationRepository.findOne({
        where: {
          id: id,
          isDeleted: false,
        },
      });

      location = await this.locationRepository.save({
        ...location,
        isDeleted: true,
        deletedDate: new Date(),
      });
      if (!location) {
        throw new Error('Fail to delete location');
      }

      response.hasError = false;
      response.appData = {
        id: location.id,
        address: location.address,
        name: location.name,
        latitude: +location.latitude,
        longitude: +location.longitude,
        ggPlaceId: location.ggPlaceId,
        userId: location.userId,
        isDeleted: location.isDeleted,
        deletedDate: location.deletedDate,
      };
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
