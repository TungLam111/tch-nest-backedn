import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiResponse, ResponseData } from 'src/helper/common/interfaces';
import { Repository } from 'typeorm';
import { TchNotification } from './entities/notification.entity';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(TchNotification)
    private readonly notificationRepository: Repository<TchNotification>,
  ) {}

  private logger = new Logger(NotificationService.name);

  async getAllByPagination(): Promise<ApiResponse<any>> {
    const responseData = new ResponseData();
    try {
      responseData.hasError = false;
      return {
        status: HttpStatus.OK,
        content: responseData,
      };
    } catch (e) {
      this.logger.error(e);
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        content: null,
      };
    }
  }

  async getOne(): Promise<ApiResponse<any>> {
    const responseData = new ResponseData();
    try {
      responseData.hasError = false;
      return {
        status: HttpStatus.OK,
        content: responseData,
      };
    } catch (e) {
      this.logger.error(e);
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        content: null,
      };
    }
  }

  async seenAllNotification(): Promise<ApiResponse<any>> {
    const responseData = new ResponseData();
    try {
      responseData.hasError = false;
      return {
        status: HttpStatus.OK,
        content: responseData,
      };
    } catch (e) {
      this.logger.error(e);
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        content: null,
      };
    }
  }

  async seenOneNotification(): Promise<ApiResponse<any>> {
    const responseData = new ResponseData();
    try {
      responseData.hasError = false;
      return {
        status: HttpStatus.OK,
        content: responseData,
      };
    } catch (e) {
      this.logger.error(e);
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        content: null,
      };
    }
  }

  async sendNotiToAll(
    title: string,
    body: string,
    data: any,
  ): Promise<ApiResponse<any>> {
    const responseData = new ResponseData();
    try {
      responseData.hasError = false;
      return {
        status: HttpStatus.OK,
        content: responseData,
      };
    } catch (e) {
      this.logger.error(e);
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        content: null,
      };
    }
  }
}
