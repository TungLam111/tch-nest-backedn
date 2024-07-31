export class AddBasketDTO {
  mealId: string; // meal id
  price: string;
  quantity: string;
  topping: any;
}

export class UpdateBasketDTO {
  id: string;
  mealId: string;
  price: string;
  quantity: string;
  topping: any;
}
