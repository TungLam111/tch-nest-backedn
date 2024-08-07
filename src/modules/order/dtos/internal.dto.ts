export class CreateOrderDto {
  orderType: string;

  couponId: string;

  paymentCardId: string | null;

  paymentMethodId: string;

  note: string;

  shipAddress: string;

  locationId: string;

  latitude: number;

  longitude: number;
}

export class UpdateStatusOrderDto {
  status: string;
}

export class CancelOrderDto {
  orderId: string;

  cancelReason: string;
}
