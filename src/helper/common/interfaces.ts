import { HttpStatus } from "@nestjs/common";

import { Request } from 'express';
import { User } from "src/modules/user/entities/user.entity";

export interface AuthenticatedRequest extends Request {
    user: User; // Replace 'any' with the actual type of your user object if possible
}
export class ApiResponse {
    status: HttpStatus;
    content: any;
}

export class ResponseData {
    hasError: boolean = true;
    errorCode: string = '';
    message: string = '';
    appData: any = null;
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