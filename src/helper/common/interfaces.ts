import { HttpStatus } from '@nestjs/common';

export class ApiResponse<T> {
  status: HttpStatus;
  content: ResponseData<T>;
}

export class ResponseData<T> {
  hasError: boolean = true;
  errorCode: string = '';
  message: string = '';
  appData: T = null;
}

export class PaginationParam {
  page: number;
  limit: number;
}

export class PaginationMetaData {
  total: number;
  current_page: number;
  total_pages: number;
  next_page: number;
  prev_page: number;
}

export class ResponseListWithPagination {
  items: any[];
  pagination: PaginationMetaData;
}
