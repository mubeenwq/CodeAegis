import { mockConfusionMatrix, mockMLDataset, mockMLModels } from "@/data/mockML";

export const mlService = {
  getModels() {
    return mockMLModels;
  },
  getDatasetOverview() {
    return mockMLDataset;
  },
  getConfusionMatrix() {
    return mockConfusionMatrix;
  },
};
