import { Test, TestingModule } from '@nestjs/testing';
import { OrderBasketService } from './order-basket.service';

describe('OrderBasketService', () => {
  let service: OrderBasketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderBasketService],
    }).compile();

    service = module.get<OrderBasketService>(OrderBasketService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
