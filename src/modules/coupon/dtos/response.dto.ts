export class CouponResponse {
  id: string;
  code: string;
  couponType: string;
  description: string;
  discountPercentage: number;
  expiryDate: Date;
  minimumSpend: number;
  isActive: boolean;
  userId: string;
}
