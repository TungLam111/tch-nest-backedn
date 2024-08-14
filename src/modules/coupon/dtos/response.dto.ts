export class VerifyOrderResponse {
  isValid: boolean;
  message?: string;
  foodCost: number;
  discount?: number;
  totalCost: number;
  deliveryCost: number;
}
