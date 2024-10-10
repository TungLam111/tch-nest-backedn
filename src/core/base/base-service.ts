import { HttpStatus, Logger } from '@nestjs/common';
import { AbstractEntity } from 'src/helper/common/common-entity';
import { Repository } from 'typeorm';
import { EntityId } from 'typeorm/repository/EntityId';
import { FunctionError } from '../../helper/common/error-app';
import { ApiResponse, ResponseData } from '../../helper/common/interfaces';

export interface IBaseRepository<T> {
  // index(): Promise<T[]>;

  findOneById(id: EntityId): Promise<T>;

  findManyByIds(id: [EntityId]): Promise<T[]>;

  storeEntity(data: T): Promise<T>;

  updateEntity(data: T): Promise<T>;

  deleteEntity(data: T): Promise<T>;
}

export class BaseService<T extends AbstractEntity, R extends Repository<T>> {
  logger: Logger;
  readonly repository: R;

  constructor(repository: R, name: string) {
    this.logger = new Logger(name);
    this.repository = repository;
  }

  async handleRequest<T>(
    operation: () => Promise<T>,
    successStatusCode?: number,
  ): Promise<ApiResponse<T>> {
    const response = new ResponseData<T>();
    try {
      const result = await operation();
      response.hasError = false;
      response.appData = result;
      return {
        status: successStatusCode || HttpStatus.OK,
        content: response,
      };
    } catch (error) {
      const err = error as FunctionError;
      this.logger.error(err);
      response.message = err.message;
      return {
        status: err.responseCode || HttpStatus.INTERNAL_SERVER_ERROR,
        content: response,
      };
    }
  }
}
