import { Test, TestingModule } from '@nestjs/testing';
import { OrderRatingService } from './order-rating.service';

describe('OrderRatingService', () => {
  let service: OrderRatingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderRatingService],
    }).compile();

    service = module.get<OrderRatingService>(OrderRatingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
