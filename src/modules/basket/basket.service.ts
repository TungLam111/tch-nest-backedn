import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FunctionError } from 'src/helper/common/error_app';
import { ApiResponse } from 'src/helper/common/interfaces';
import { SharedService } from 'src/helper/shared_service';
import { Repository } from 'typeorm';
import { AddBasketDTO, UpdateBasketDTO } from './dtos/request.dto';
import { Basket } from './entities/basket.entity';

@Injectable()
export class BasketService extends SharedService {
  constructor(
    @InjectRepository(Basket)
    private readonly basketRepository: Repository<Basket>,
  ) {
    super(BasketService.name);
  }

  async getAllBasketItems(userId: string): Promise<ApiResponse> {
    return this.handleRequest(async () => {
      const baskets = await this.basketRepository.find({
        where: {
          isDeleted: false,
          userId: userId,
        },
      });
      return baskets;
    });
  }

  async getOneBasketItem(
    userId: string,
    basketId: string,
  ): Promise<ApiResponse> {
    return this.handleRequest(async () => {
      const basket = await this.basketRepository.findOne({
        where: {
          isDeleted: false,
          userId: userId,
          id: basketId,
        },
      });

      if (basket !== null && basket !== undefined) {
        return basket;
      }

      throw new FunctionError(HttpStatus.BAD_REQUEST, 'Basket not found');
    });
  }

  async deleteOne(userId: string, basketId: string): Promise<ApiResponse> {
    return this.handleRequest(async () => {
      const basket = await this.basketRepository.findOne({
        where: {
          isDeleted: false,
          userId: userId,
          id: basketId,
        },
      });

      if (basket === undefined || basket === null) {
        throw new FunctionError(HttpStatus.BAD_REQUEST, 'Basket not found');
      }

      basket.deletedDate = new Date();
      basket.isDeleted = true;

      const updatedBasket = await this.basketRepository.save(basket);
      return updatedBasket;
    });
  }

  async addOne(userId: string, dto: AddBasketDTO): Promise<ApiResponse> {
    return this.handleRequest(async () => {
      const newBasket = new Basket();
      newBasket.userId = userId;
      newBasket.mealId = dto.mealId;
      newBasket.quantity = dto.quantity;
      newBasket.price = dto.price;
      newBasket.topping = dto.topping;

      const addedBasket = await this.basketRepository.save(newBasket);

      if (addedBasket !== undefined && addedBasket !== null) {
        return addedBasket;
      }
      throw new FunctionError(HttpStatus.INTERNAL_SERVER_ERROR, '');
    });
  }

  async updateOne(
    userId: string,
    basketId: string,
    dto: UpdateBasketDTO,
  ): Promise<ApiResponse> {
    return this.handleRequest(async () => {
      const findBasket = await this.basketRepository.findOne({
        where: {
          id: basketId,
          userId: userId,
        },
      });

      if (!findBasket || findBasket === undefined) {
        throw new FunctionError(HttpStatus.BAD_REQUEST, 'Cannot find basket');
      }

      const updatedBasket = await this.basketRepository.save({
        ...findBasket,
        mealId: dto.mealId,
        price: dto.price,
        quantity: dto.quantity,
        topping: dto.topping,
      });

      if (updatedBasket !== undefined && updatedBasket !== null) {
        return updatedBasket;
      }
      throw new FunctionError(HttpStatus.INTERNAL_SERVER_ERROR, '');
    });
  }
}
