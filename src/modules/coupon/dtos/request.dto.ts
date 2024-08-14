export class VerifyOrderRequest {
  latitude?: number;
  longitude?: number;
  couponId?: string;
  orderType: string;
  paymentCardId?: string;
  paymentMethodId: string;
  locationId?: string;
}

export class AddCouponRequest {
  code: string;
  couponType: string;
  description: string;
  discountPercentage?: number;
  minimumSpend: number;
  expiryDate: Date;
}
