import { Test, TestingModule } from '@nestjs/testing';
import { KnnController } from './knn.controller';

describe('KnnController', () => {
  let controller: KnnController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KnnController],
    }).compile();

    controller = module.get<KnnController>(KnnController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
