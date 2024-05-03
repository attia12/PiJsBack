import { Controller, Post, Body } from '@nestjs/common';
import { KnnService } from './knn.service';

@Controller('knn')
export class KnnController {
  constructor(private readonly knnService: KnnService) {}

  @Post('add-example')
  async addExample(@Body() body: { vector: number[], label: string }) {
    this.knnService.addExample(body.vector, body.label);
  }

  @Post('predict')
  async predict(@Body() body: { vector: number[] }) {
    return this.knnService.predict(body.vector);
  }

  @Post('dispose')
  async dispose() {
    this.knnService.dispose();
  }
}
