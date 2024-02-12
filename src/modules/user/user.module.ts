import { Module } from '@nestjs/common';
import { ProductModule } from '../product/product.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [ProductModule]
})
export class UserModule { }
