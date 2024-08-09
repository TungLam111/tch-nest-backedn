import { Test, TestingModule } from '@nestjs/testing';
import { ToppingOptionController } from './topping-option.controller';

describe('ToppingOptionController', () => {
  let controller: ToppingOptionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ToppingOptionController],
    }).compile();

    controller = module.get<ToppingOptionController>(ToppingOptionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
