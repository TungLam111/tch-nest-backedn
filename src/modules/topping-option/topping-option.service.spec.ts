import { Test, TestingModule } from '@nestjs/testing';
import { ToppingOptionService } from './topping-option.service';

describe('ToppingOptionService', () => {
  let service: ToppingOptionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ToppingOptionService],
    }).compile();

    service = module.get<ToppingOptionService>(ToppingOptionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
