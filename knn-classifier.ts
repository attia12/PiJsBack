import * as tf from '@tensorflow/tfjs-core';

export class KNNClassifier {
    private dataset: { vectors: tf.Tensor2D, labels: string[] } = { vectors: null, labels: [] };
    private k = 3;

    addExample(vector: number[], label: string) {
        const newVector = tf.tensor2d([vector]);
        if (this.dataset.vectors == null) {
            this.dataset.vectors = newVector;
        } else {
            this.dataset.vectors = tf.concat([this.dataset.vectors, newVector], 0);
        }
        this.dataset.labels.push(label);
    }

    async predict(vector: number[]): Promise<string> {
        if (this.dataset.vectors == null) {
            throw new Error('Cannot predict when dataset is empty.');
        }
    
        const newVector = tf.tensor2d([vector]);
        const distances = tf.norm(tf.sub(this.dataset.vectors, newVector), 2, 1);
        const topKIndices = tf.topk(distances, 1).indices.arraySync() as number[];
        const topKLabels = topKIndices.map((i: number) => this.dataset.labels[i]);
        const labelCounts: {[label: string]: number} = {};
        topKLabels.forEach(label => {
            labelCounts[label] = (labelCounts[label] || 0) + 1;
        });
        const sortedLabels = Object.keys(labelCounts).sort((a, b) => labelCounts[b] - labelCounts[a]);
        return sortedLabels[0];
    }
    

    dispose() {
        if (this.dataset.vectors != null) {
            this.dataset.vectors.dispose();
        }
    }
}
