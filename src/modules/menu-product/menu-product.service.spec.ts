import { Test, TestingModule } from '@nestjs/testing';
import { MenuProductService } from './menu-product.service';

describe('MenuProductService', () => {
  let service: MenuProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MenuProductService],
    }).compile();

    service = module.get<MenuProductService>(MenuProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
