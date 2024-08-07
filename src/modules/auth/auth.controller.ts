import { Body, Controller, Post, Res } from '@nestjs/common';
import { UserService } from '../user/user.service';
import {
  CreateAccountRequestDto,
  LoginRequestDto,
} from './dtos/login-request.dto';

@Controller('auth')
export class AuthController {
  constructor(private userService: UserService) {}

  @Post('login')
  async login(@Res() res: any, @Body() req: LoginRequestDto) {
    const result = await this.userService.verifyAccount(req);
    res.status(result.status).json(result.content);
  }

  @Post('create-account')
  async createAccount(@Res() res: any, @Body() req: CreateAccountRequestDto) {
    const result = await this.userService.createAccount(req);
    res.status(result.status).json(result.content);
  }
}
