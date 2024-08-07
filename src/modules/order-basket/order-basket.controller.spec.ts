import { Test, TestingModule } from '@nestjs/testing';
import { OrderBasketController } from './order-basket.controller';

describe('OrderBasketController', () => {
  let controller: OrderBasketController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderBasketController],
    }).compile();

    controller = module.get<OrderBasketController>(OrderBasketController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
