import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FunctionError } from 'src/helper/common/error_app';
import { ApiResponse } from 'src/helper/common/interfaces';
import { SharedService } from 'src/helper/shared_service';
import { Repository } from 'typeorm';
import { AddBasketDTO, UpdateBasketDTO } from './dtos/request.dto';
import { BasketListResponseDto, BasketResponseDto } from './dtos/response.dto';
import { Basket } from './entities/basket.entity';

@Injectable()
export class BasketService extends SharedService {
  constructor(
    @InjectRepository(Basket)
    private readonly basketRepository: Repository<Basket>,
  ) {
    super(BasketService.name);
  }

  async getAllBasketItems(
    userId: string,
  ): Promise<ApiResponse<BasketListResponseDto>> {
    return this.handleRequest<BasketListResponseDto>(async () => {
      return this.getAllRecentBaskets(userId);
    });
  }

  async getAllRecentBaskets(userId: string): Promise<BasketListResponseDto> {
    const baskets = await this.basketRepository.find({
      where: {
        isDeleted: false,
        userId: userId,
        isDone: false,
      },
      order: {
        createdAt: 'DESC',
      },
    });

    if (baskets !== undefined && baskets !== null) {
      let basketList = baskets.map(
        (e) =>
          <BasketResponseDto>{
            id: e.id,
            mealId: e.mealId,
            quantity: e.quantity,
            price: +e.price,
            topping: JSON.parse(e.topping),
            userId: e.userId,
            mealCategory: e.mealCategory,
            mealName: e.mealName,
            mealImage: e.mealImage,
            createdAt: e.createdAt,
          },
      );
      let foodPrice = 0;
      basketList.forEach((e) => {
        foodPrice += +(e.price ?? 0) * e.quantity;
      });
      return {
        results: basketList,
        foodPrice: foodPrice,
      };
    }
    return { results: [], foodPrice: 0 };
  }

  async getOneBasketItem(
    userId: string,
    basketId: string,
  ): Promise<ApiResponse<BasketResponseDto>> {
    return this.handleRequest<BasketResponseDto>(async () => {
      const basket = await this.basketRepository.findOne({
        where: {
          isDeleted: false,
          userId: userId,
          id: basketId,
          isDone: false,
        },
      });

      if (basket !== null && basket !== undefined) {
        return <BasketResponseDto>{
          id: basket.id,
          mealId: basket.mealId,
          quantity: basket.quantity,
          price: +basket.price,
          topping: JSON.parse(basket.topping),
          userId: basket.userId,
          mealCategory: basket.mealCategory,
          mealName: basket.mealName,
          mealImage: basket.mealImage,
          createdAt: basket.createdAt,
        };
      }

      throw new FunctionError(HttpStatus.BAD_REQUEST, 'Basket not found');
    });
  }

  async deleteOne(
    userId: string,
    basketId: string,
  ): Promise<ApiResponse<Basket>> {
    return this.handleRequest<Basket>(async () => {
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
      basket.isDone = true;

      const updatedBasket = await this.basketRepository.save(basket);
      return updatedBasket;
    });
  }

  async addOne(
    userId: string,
    dto: AddBasketDTO,
  ): Promise<ApiResponse<Basket>> {
    return this.handleRequest<Basket>(async () => {
      const newBasket = new Basket();
      newBasket.userId = userId;
      newBasket.mealId = dto.mealId;
      newBasket.quantity = dto.quantity;
      newBasket.price = dto.price;
      newBasket.topping = JSON.stringify(dto.topping);
      newBasket.mealCategory = dto.mealCategory;
      newBasket.mealImage = dto.mealImage;
      newBasket.mealName = dto.mealName;
      newBasket.isDone = false;

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
  ): Promise<ApiResponse<Basket>> {
    return this.handleRequest<Basket>(async () => {
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

        mealCategory: dto.mealCategory,
        mealImage: dto.mealImage,
        mealName: dto.mealName,
      });

      if (updatedBasket !== undefined && updatedBasket !== null) {
        return updatedBasket;
      }
      throw new FunctionError(HttpStatus.INTERNAL_SERVER_ERROR, '');
    });
  }
}
