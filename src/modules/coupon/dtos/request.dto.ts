export class CheckUsageCouponRequest {
  amountDelivery?: number;
}

export class AddCouponRequest {
  code: string;
  couponType: string;
  description: string;
  discountPercentage?: number;
  minimumSpend: number;
  expiryDate: Date;
}
