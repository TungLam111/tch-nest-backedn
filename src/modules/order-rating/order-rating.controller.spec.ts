import { Test, TestingModule } from '@nestjs/testing';
import { OrderRatingController } from './order-rating.controller';

describe('OrderRatingController', () => {
  let controller: OrderRatingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderRatingController],
    }).compile();

    controller = module.get<OrderRatingController>(OrderRatingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
