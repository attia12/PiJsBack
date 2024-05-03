import { Injectable } from '@nestjs/common';
import { KNNClassifier } from 'knn-classifier';
import * as tf from '@tensorflow/tfjs';

@Injectable()
export class KnnService {
  private knn: KNNClassifier;

  constructor() {
    this.knn = new KNNClassifier();
    tf.setBackend('cpu');
  }

  addExample(vector: number[], label: string) {
    this.knn.addExample(vector, label);
  }

  async predict(vector: number[]): Promise<string> {
    return this.knn.predict(vector);
  }

  dispose() {
    this.knn.dispose();
  }
}

