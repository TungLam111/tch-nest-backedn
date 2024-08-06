import { Basket } from '../entities/basket.entity';

export class BasketListResponseDto {
  results: Basket[];
  foodPrice: number;
  totalPrice: number;
  deliveryPrice: number;
}

export class BasketResponseDto {
  id: string;
  mealId: string;
  quantity: number;
  price: string;
  topping: Record<string, number>;
  userId: string;
  mealCategory: string;
  mealName: string;
  mealImage: string;
  createdAt: Date;
}
