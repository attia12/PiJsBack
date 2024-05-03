import { Test, TestingModule } from '@nestjs/testing';
import { KnnService } from './knn.service';

describe('KnnService', () => {
  let service: KnnService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KnnService],
    }).compile();

    service = module.get<KnnService>(KnnService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
