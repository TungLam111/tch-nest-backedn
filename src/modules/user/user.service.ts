import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { FunctionError } from 'src/helper/common/error_app';
import { SharedService } from 'src/helper/shared_service';
import { Repository } from 'typeorm';
import { ApiResponse } from '../../helper/common/interfaces';
import {
  CreateAccountRequestDto,
  LoginRequestDto,
} from '../auth/dtos/login-request.dto';
import { Product } from '../product/entities/product.entity';
import { ProductService } from '../product/product.service';
import { User } from './entities/user.entity';

@Injectable()
export class UserService extends SharedService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private productService: ProductService,
    private readonly jwtService: JwtService,
  ) {
    super(UserService.name);
  }

  async getUser(userId: string): Promise<User> {
    return this.userRepository.findOne({
      where: {
        isDeleted: false,
        id: userId,
      },
    });
  }

  async verifyAccount(req: LoginRequestDto): Promise<
    ApiResponse<{
      access_token: string;
      refresh_token: string;
    }>
  > {
    return this.handleRequest(async () => {
      const findUser = await this.userRepository.findOne({
        where: {
          password: req.password,
          email: req.email,
        },
      });

      if (!findUser || findUser === undefined) {
        throw new FunctionError(HttpStatus.BAD_REQUEST, 'User not found');
      }
      return {
        access_token: await this.generateAccessToken(
          findUser.id,
          findUser.email,
        ),
        refresh_token: await this.generateRefreshToken(
          findUser.id,
          findUser.email,
        ),
      };
    });
  }

  async createAccount(
    req: CreateAccountRequestDto,
  ): Promise<ApiResponse<User>> {
    return this.handleRequest(async () => {
      const findUser = await this.userRepository.findOne({
        where: {
          email: req.email,
        },
      });

      if (findUser || findUser === undefined) {
        throw new FunctionError(HttpStatus.BAD_REQUEST, 'User already exists');
      }

      const createUser = await this.userRepository.save({
        email: req.email,
        password: req.password,
        phoneNumber: req.phoneNumber,
        name: req.name,
      });

      if (!createUser) {
        throw new FunctionError(HttpStatus.INTERNAL_SERVER_ERROR, null);
      }

      return createUser;
    });
  }

  async getRecentProducts(userId: string): Promise<ApiResponse<Product[]>> {
    return this.handleRequest(async () => {
      return [];
    });
  }

  async likeProduct(user: User, productId: string): Promise<ApiResponse<User>> {
    return this.handleRequest(async () => {
      const productCheck = await this.productService.findOne(productId);
      if (!productCheck) {
        throw new FunctionError(HttpStatus.BAD_REQUEST, 'Cannot find product');
      }

      let likeProducts: string[];
      if (!user.likeProducts) {
        likeProducts = [];
      } else {
        likeProducts = JSON.parse(user.likeProducts);
      }
      likeProducts.push(productCheck.id);

      let updateUser: User = {
        ...user,
        likeProducts: JSON.stringify(likeProducts),
      };

      updateUser = await this.userRepository.save(updateUser);
      if (!updateUser) {
        throw new FunctionError(
          HttpStatus.INTERNAL_SERVER_ERROR,
          'Fail to update like product',
        );
      }
      return updateUser;
    });
  }

  async unlikeProduct(
    user: User,
    productId: string,
  ): Promise<ApiResponse<User>> {
    return this.handleRequest<User>(async () => {
      const productCheck = await this.productService.findOne(productId);
      if (!productCheck) {
        throw new FunctionError(HttpStatus.BAD_REQUEST, 'Cannot find product');
      }

      let likeProducts: string[];
      if (!user.likeProducts) {
        throw new FunctionError(HttpStatus.BAD_REQUEST, '');
      } else {
        likeProducts = JSON.parse(user.likeProducts);
      }
      likeProducts = likeProducts.filter((p) => p != productCheck.id);

      let updateUser: User = {
        ...user,
        likeProducts: JSON.stringify(likeProducts),
      };

      updateUser = await this.userRepository.save(updateUser);
      if (!updateUser) {
        throw new FunctionError(
          HttpStatus.INTERNAL_SERVER_ERROR,
          'Fail to update like product',
        );
      }
      return updateUser;
    });
  }

  async getLikedProducts(user: User): Promise<ApiResponse<Product[]>> {
    return this.handleRequest<Product[]>(async () => {
      let productIds = user.likeProducts;
      if (!productIds || productIds.length === 0) {
        return [];
      }

      const products = await this.productRepository
        .createQueryBuilder('product')
        .where('product.id IN (:...ids)', {
          ids: productIds || [],
        })
        .andWhere('product.isDeleted = false')
        .getMany();
      return products;
    });
  }

  async generateAccessToken(userId: string, email: string): Promise<string> {
    const payload = { sub: userId, email };
    return this.jwtService.sign(payload);
  }

  async generateRefreshToken(userId: string, email: string): Promise<string> {
    const payload = { sub: userId, email };
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d',
    });
  }
}
