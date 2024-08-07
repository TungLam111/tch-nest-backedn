import { Test, TestingModule } from '@nestjs/testing';
import { CommonResourceController } from './common-resource.controller';

describe('CommonResourceController', () => {
  let controller: CommonResourceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommonResourceController],
    }).compile();

    controller = module.get<CommonResourceController>(CommonResourceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
