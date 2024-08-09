import { Test, TestingModule } from '@nestjs/testing';
import { MenuProductController } from './menu-product.controller';

describe('MenuProductController', () => {
  let controller: MenuProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MenuProductController],
    }).compile();

    controller = module.get<MenuProductController>(MenuProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
