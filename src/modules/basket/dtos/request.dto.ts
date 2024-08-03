export class AddBasketDTO {
  mealId: string; // meal id
  mealName: string;
  mealCategory: string;
  mealImage: string;

  price: string;
  quantity: number;
  topping: any;
}

export class UpdateBasketDTO {
  id: string;
  mealId: string;
  price: string;
  quantity: number;
  topping: any;

  mealName: string;
  mealCategory: string;
  mealImage: string;
}
