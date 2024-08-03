import { HttpStatus, Logger } from '@nestjs/common';
import { FunctionError } from './common/error_app';
import { ApiResponse, ResponseData } from './common/interfaces';

export class SharedService {
  logger: Logger;
  constructor(name: string) {
    this.logger = new Logger(name);
  }
  async handleRequest<T>(
    operation: () => Promise<T>,
    successStatusCode?: number,
  ): Promise<ApiResponse> {
    const response = new ResponseData();
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
