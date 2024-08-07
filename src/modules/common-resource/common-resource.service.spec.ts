import { Test, TestingModule } from '@nestjs/testing';
import { CommonResourceService } from './common-resource.service';

describe('CommonResourceService', () => {
  let service: CommonResourceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommonResourceService],
    }).compile();

    service = module.get<CommonResourceService>(CommonResourceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
