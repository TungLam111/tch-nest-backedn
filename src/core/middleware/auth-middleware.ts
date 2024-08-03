import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Response } from 'express';
import { User } from 'src/modules/user/entities/user.entity';
import { UserService } from 'src/modules/user/user.service';
import { AuthenticatedRoleRequest, AuthenticatedUser } from './auth-user';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async use(req: AuthenticatedRoleRequest, res: Response, next: NextFunction) {
    if (
      !req.headers['authorization'] ||
      typeof req.headers['authorization'] !== 'string'
    ) {
      throw new ApiUnauthorizedException({
        message: 'Unauthorized - Missing access token',
      });
    }
    const findBearer = req.headers['authorization'].includes('Bearer ');
    const accessToken = findBearer
      ? req.headers['authorization'].split('Bearer ')[1]
      : req.headers['authorization'];

    const decoded = this.jwtService.decode(accessToken);
    if (!decoded) {
      throw new ApiUnauthorizedException({
        message: 'Unauthorized - Failed to decode access token',
      });
    }

    var user: User;
    user = await this.userService.getUser(decoded['userId']);
    if (!user) {
      throw new ApiNotFoundException({
        message: 'Unauthorized - User not found',
      });
    }
    const authenticatedUser: AuthenticatedUser = {
      user: user,
    };
    req['user'] = authenticatedUser;

    next();
  }
}

export enum ERROR_CODE {}

export type ErrorModel = {
  error: {
    code: string | number;
    traceid: string;
    context: string;
    message: string;
    timestamp: string;
    path: string;
  };
};

type ParametersType = { [key: string]: unknown };

export class BaseException extends HttpException {
  traceId: string;
  readonly context: string;
  readonly statusCode: number;
  readonly code?: string;
  readonly parameters: ParametersType;
  readonly stackTrace?: string;

  constructor(
    message: string,
    status: HttpStatus,
    parameters?: ParametersType,
  ) {
    super(message, status);

    if (parameters) {
      this.parameters = parameters;
    }

    this.statusCode = super.getStatus();

    if (process.env.NODE_ENV === 'development') {
      Error.captureStackTrace(this, this.constructor);
      this.stackTrace = this.stack;
    }
  }
}

export class BaseResponseException extends BaseException {
  hasError?: boolean;
  errorCode?: ERROR_CODE;
  appData?: any;

  constructor(
    message: string,
    statusCode: HttpStatus,
    parameters?: ParametersType,
    hasError?: boolean,
    appData?: any,
    errorCode?: ERROR_CODE,
  ) {
    super(message, statusCode, parameters);
    this.hasError = hasError ?? true;
    this.appData = appData ?? null;
    this.errorCode = errorCode ?? null;
  }
}

export class ApiCustomException extends BaseResponseException {
  constructor({
    message,
    parameters,
    errorCode,
    appData,
    hasError,
    statusCode,
  }: {
    message?: string;
    errorCode?: ERROR_CODE;
    appData?: any;
    hasError?: boolean;
    parameters?: ParametersType;
    statusCode?: HttpStatus;
  }) {
    super(
      message ?? 'InternalServerException',
      statusCode ?? 500,
      parameters,
      hasError,
      appData,
      errorCode,
    );
  }
}

export class ApiInternalServerException extends BaseResponseException {
  constructor({
    message,
    parameters,
    errorCode,
    appData,
    hasError,
  }: {
    message?: string;
    errorCode?: ERROR_CODE;
    appData?: any;
    hasError?: boolean;
    parameters?: ParametersType;
  }) {
    super(
      message ?? 'InternalServerException',
      500,
      parameters,
      hasError,
      appData,
      errorCode,
    );
  }
}

export class ApiNotFoundException extends BaseResponseException {
  constructor({
    message,
    parameters,
    errorCode,
    appData,
    hasError,
  }: {
    message?: string;
    errorCode?: ERROR_CODE;
    appData?: any;
    hasError?: boolean;
    parameters?: ParametersType;
  }) {
    super(
      message ?? 'NotFoundException',
      404,
      parameters,
      hasError,
      appData,
      errorCode,
    );
  }
}

export class ApiConflictException extends BaseResponseException {
  constructor({
    message,
    parameters,
    errorCode,
    appData,
    hasError,
  }: {
    message?: string;
    errorCode?: ERROR_CODE;
    appData?: any;
    hasError?: boolean;
    parameters?: ParametersType;
  }) {
    super(
      message ?? 'ConflictException',
      409,
      parameters,
      hasError,
      appData,
      errorCode,
    );
  }
}

export class ApiUnauthorizedException extends BaseResponseException {
  constructor({
    message,
    parameters,
    errorCode,
    appData,
    hasError,
  }: {
    message?: string;
    errorCode?: ERROR_CODE;
    appData?: any;
    hasError?: boolean;
    parameters?: ParametersType;
  }) {
    super(
      message ?? 'UnauthorizedException',
      401,
      parameters,
      hasError,
      appData,
      errorCode,
    );
  }
}

export class ApiBadRequestException extends BaseResponseException {
  constructor({
    message,
    parameters,
    errorCode,
    appData,
    hasError,
  }: {
    message?: string;
    errorCode?: ERROR_CODE;
    appData?: any;
    hasError?: boolean;
    parameters?: ParametersType;
  }) {
    super(
      message ?? 'BadRequestException',
      400,
      parameters,
      hasError,
      appData,
      errorCode,
    );
  }
}

export class ApiForbiddenException extends BaseResponseException {
  constructor({
    message,
    parameters,
    errorCode,
    appData,
    hasError,
  }: {
    message?: string;
    errorCode?: ERROR_CODE;
    appData?: any;
    hasError?: boolean;
    parameters?: ParametersType;
  }) {
    super(
      message ?? 'ForbiddenException',
      403,
      parameters,
      hasError,
      appData,
      errorCode,
    );
  }
}
