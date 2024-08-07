import { Request } from 'express';
import { User } from 'src/modules/user/entities/user.entity';

export interface AuthenticatedUser {
  user: User;
}

export interface AuthenticatedRoleRequest extends Request {
  user: AuthenticatedUser;
}
