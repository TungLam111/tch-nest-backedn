export class BasketListResponseDto {
  results: BasketResponseDto[];
  foodPrice: number;
}

export class BasketResponseDto {
  id: string;
  mealId: string;
  quantity: number;
  price: number;
  topping: Record<string, number>;
  userId: string;
  mealCategory: string;
  mealName: string;
  mealImage: string;
  createdAt: Date;
}
